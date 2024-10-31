import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/AlertDialog';

type AlertDialogProps = {
  title?: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  onClickAction?: () => void;
};

const AlertDialogComponent: React.FC<AlertDialogProps> = ({
  title,
  description,
  cancelText,
  actionText,
  onClickAction,
}) => (
  <AlertDialog>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{cancelText}</AlertDialogCancel>
        <AlertDialogAction onClick={onClickAction}>
          {actionText}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default AlertDialogComponent;
