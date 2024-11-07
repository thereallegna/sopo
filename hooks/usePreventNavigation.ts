// hooks/usePreventNavigation.ts
import { useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useFormStore from '@stores/useFormStore';
import { useDrawerStore } from '@stores/useDrawerStore';

export const usePreventNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const nextPathRef = useRef<string | null>('/dashboard');

  const { isDirty, leavingPage, setLeavingPage, resetForm } = useFormStore(); // Ambil resetForm dari store
  const { closeDrawer } = useDrawerStore();

  useEffect(() => {
    if (isDirty) {
      window.history.pushState({ from: pathname }, '', pathname);
    }
  }, [isDirty, pathname]);

  useEffect(() => {
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

    const handlePopState = (event: PopStateEvent) => {
      if (isDirty) {
        event.preventDefault();
        const targetPath = event.state?.from || '/dashboard';
        nextPathRef.current = targetPath;
        window.history.pushState({ from: pathname }, '', pathname);
        setLeavingPage(true);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        // eslint-disable-next-line no-param-reassign
        e.returnValue = '';
        return '';
      }
      return undefined;
    };

    document.addEventListener('click', handleClick, true);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

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
      closeDrawer();
      resetForm(); // Panggil resetForm untuk mereset form
      setLeavingPage(false);

      try {
        router.push(nextPath);
      } catch (err) {
        console.error('Failed to navigate:', err);
      }
    }
  }, [closeDrawer, router, resetForm, setLeavingPage]);

  return {
    leavingPage,
    closeLeavingDialog,
    confirmLeaving,
  };
};
