// components/PreventNavigationDialog.tsx

"use client";

import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@components/ui/AlertDialog";
import { usePreventNavigation } from "@hooks/usePreventNavigation";
import { IconHelpCircleFilled } from "@tabler/icons-react";
import IconComponent, { IconProps } from "@components/ui/Icon";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";

const PreventNavigationDialog = () => {
    const { leavingPage, closeLeavingDialog, confirmLeaving } =
        usePreventNavigation();

    return (
        <AlertDialog open={leavingPage}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>The data will be lost.</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to leave the page?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={closeLeavingDialog}>
                        No
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={confirmLeaving}>
                        Yes
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default PreventNavigationDialog;

type ConfirmationAlertProps = {
    description?: string;
    label?: string;
    labelCancel?: string;
    labelAction?: string;
    labelIcon?: IconProps;
    action: () => void;
    onClose: () => void;
} & AlertDialogProps;

const ConfirmationAlert = ({
    description,
    onClose,
    action,
    label,
    labelIcon,
    labelCancel,
    labelAction,
    ...props
}: ConfirmationAlertProps) => (
    <AlertDialog {...props}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    <div className="flex items-center gap-[10px]">
                        <IconComponent
                            icon={IconHelpCircleFilled}
                            className="text-Blue-500"
                            size="x_large"
                            {...labelIcon}
                        />
                        <p>{label || "Alert"}</p>
                    </div>
                </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription className="whitespace-pre-line text-base">
                {description}
            </AlertDialogDescription>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={onClose}>
                    {labelCancel || "No"}
                </AlertDialogCancel>
                <AlertDialogAction onClick={action}>
                    {labelAction || "Yes"}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);

export { ConfirmationAlert };
