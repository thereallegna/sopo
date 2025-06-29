// hooks/usePreventNavigation.ts
import { useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import useFormStore from "@stores/useFormStore";
import { useDrawerStore } from "@stores/useDrawerStore";

export const usePreventNavigation = () => {
    const router = useRouter();
    const pathname = usePathname();
    const nextPathRef = useRef<string | null>(null);

    const {
        changeStatus,
        leavingPage,
        setLeavingPage,
        resetForm,
        setChangeStatus,
    } = useFormStore();
    const { closeDrawer, closeEditDrawer, isOpen, isOpenEdit } =
        useDrawerStore();

    useEffect(() => {
        if (changeStatus) {
            window.history.pushState({ from: pathname }, "", pathname);
        }
    }, [changeStatus, pathname]);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const link = target.closest("a");

            if (link && changeStatus) {
                const href = link.getAttribute("href");
                if (href && !href.startsWith("#") && href !== pathname) {
                    event.preventDefault();
                    nextPathRef.current = href;
                    setLeavingPage(true);
                }
            }
        };

        const handlePopState = (event: PopStateEvent) => {
            if (changeStatus) {
                event.preventDefault();
                const targetPath = event.state?.from || "/dashboard";
                nextPathRef.current = targetPath;
                window.history.pushState({ from: pathname }, "", pathname);
                setLeavingPage(true);
            }
        };

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (changeStatus) {
                e.preventDefault();
                // eslint-disable-next-line no-param-reassign
                e.returnValue = "";
                return "";
            }
            return undefined;
        };

        document.addEventListener("click", handleClick, true);
        window.addEventListener("popstate", handlePopState);
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            document.removeEventListener("click", handleClick, true);
            window.removeEventListener("popstate", handlePopState);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [changeStatus, pathname, setLeavingPage]);

    const closeLeavingDialog = useCallback(() => {
        setLeavingPage(false);
        nextPathRef.current = null;
    }, [setLeavingPage]);

    const confirmLeaving = useCallback(() => {
        const nextPath = nextPathRef.current;
        console.log("Starting navigation to:", nextPath);

        // Conditionally close the active drawer
        if (isOpenEdit) {
            setChangeStatus(false);
            setLeavingPage(false);
            closeEditDrawer();
            resetForm();
        } else if (isOpen) {
            setChangeStatus(false);

            setLeavingPage(false);
            closeDrawer();

            resetForm();
        }

        if (nextPath) {
            try {
                router.push(nextPath);
            } catch (err) {
                console.error("Failed to navigate:", err);
            }
        }
    }, [
        closeDrawer,
        closeEditDrawer,
        router,
        resetForm,
        setLeavingPage,
        isOpen,
        isOpenEdit,
    ]);

    return {
        leavingPage,
        closeLeavingDialog,
        confirmLeaving,
    };
};
