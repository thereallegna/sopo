import { useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useFormStore from '@stores/useFormStore';
import { useDrawerStore } from '@stores/useDrawerStore';

export const usePreventNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const nextPathRef = useRef<string | null>('/dashboard');

  const { isDirty, leavingPage, setLeavingPage, setIsDirty } = useFormStore();
  const { closeDrawer } = useDrawerStore();

  // Setup history blocking
  useEffect(() => {
    if (isDirty) {
      // Push the current state to add a new history entry
      window.history.pushState({ from: pathname }, '', pathname);
    }
  }, [isDirty, pathname]);

  useEffect(() => {
    // Handle link clicks
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');

      if (link && isDirty) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && href !== pathname) {
          event.preventDefault();
          nextPathRef.current = href;
          setLeavingPage(true);
        }
      }
    };

    // Handle browser back/forward
    const handlePopState = (event: PopStateEvent) => {
      if (isDirty) {
        // Prevent the default navigation by pushing current state back
        event.preventDefault();

        // Store the attempted navigation path
        const targetPath = event.state?.from || '/dashboard';
        nextPathRef.current = targetPath;

        // Push current path back to prevent navigation
        window.history.pushState({ from: pathname }, '', pathname);

        // Show confirmation dialog
        setLeavingPage(true);
      }
    };

    // Handle page refresh/close
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        // eslint-disable-next-line no-param-reassign
        e.returnValue = '';
        return '';
      }
      return undefined;
    };

    // Add event listeners with capture phase to ensure they run first
    document.addEventListener('click', handleClick, true);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty, pathname, setLeavingPage]);

  const closeLeavingDialog = useCallback(() => {
    setLeavingPage(false);
    nextPathRef.current = null;
  }, [setLeavingPage]);

  const confirmLeaving = useCallback(() => {
    const nextPath = nextPathRef.current;
    console.log('Starting navigation to:', nextPath);

    if (nextPath) {
      // Close drawer before navigating
      closeDrawer();

      // Reset states before navigation
      setIsDirty(false);
      setLeavingPage(false);

      try {
        // Navigate to the target path
        router.push(nextPath);
      } catch (err) {
        console.error('Failed to navigate:', err);
        // Restore blocking if navigation fails
        setIsDirty(true);
      }
    }
  }, [closeDrawer, router, setIsDirty, setLeavingPage]);

  return {
    leavingPage,
    closeLeavingDialog,
    confirmLeaving,
  };
};
