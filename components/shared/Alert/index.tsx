// components/PreventNavigationDialog.tsx

'use client';

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
import { usePreventNavigation } from '@hooks/usePreventNavigation';

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
          <AlertDialogCancel onClick={closeLeavingDialog}>No</AlertDialogCancel>
          <AlertDialogAction onClick={confirmLeaving}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PreventNavigationDialog;
