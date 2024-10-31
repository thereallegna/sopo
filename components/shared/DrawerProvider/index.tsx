'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import useFormStore from '@stores/useFormStore';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@components/ui/AlertDialog';
import { useCloseDrawerOnPathChange } from '@hooks/useDrawer';
import { useDrawerStore } from '@stores/useDrawerStore';

const CreateCountryModal = dynamic(
  () => import('@components/shared/Drawer/Create/CreateCountry'),
  { ssr: false }
);

const DrawerProvider = () => {
  useCloseDrawerOnPathChange();
  const { isAlertOpen, setIsAlertOpen } = useFormStore();
  const { closeDrawer } = useDrawerStore();

  return (
    <>
      <CreateCountryModal />

      {/* Tambahkan AlertDialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Peringatan</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin melanjutkan? Perubahan akan dibatalkan.
          </AlertDialogDescription>
          <AlertDialogAction onClick={closeDrawer}>Ya</AlertDialogAction>
          <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
            Batal
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DrawerProvider;
