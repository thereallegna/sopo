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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, document.title, window.location.href);
    }

    // Handle link clicks
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');

      if (link && isDirty) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && href !== pathname) {
          // event.preventDefault();
          nextPathRef.current = href;
          setLeavingPage(true);
        }
      }
    };

    // Handle browser back/forward
    const handlePopState = () => {
      if (isDirty) {
        window.history.pushState(null, document.title, window.location.href);
        nextPathRef.current = pathname;
        router.push(pathname);
      }
    };

    // Handle page refresh/close
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        // eslint-disable-next-line no-param-reassign
        e.returnValue = '';
      }
    };

    // Add event listeners
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
      // Reset dirty state and leaving page state after navigation
      try {
        router.push(nextPath);
        setIsDirty(false);
        setLeavingPage(false);
      } catch (err) {
        console.error('Failed to navigate:', err);
      }
    }
  }, [closeDrawer, router, setIsDirty, setLeavingPage]);
  return {
    leavingPage,
    closeLeavingDialog,
    confirmLeaving,
  };
};
