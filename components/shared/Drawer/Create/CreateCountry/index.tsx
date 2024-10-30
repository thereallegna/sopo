'use client';

import React from 'react';
import { Button } from '@components/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@components/ui/Drawer';

import { useDrawerStore } from '@stores/useDrawerStore';

const CreateCountry = () => {
  const { isOpen, closeDrawer } = useDrawerStore();

  return (
    <Drawer onClose={closeDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Country</DrawerTitle>
        </DrawerHeader>

        <label htmlFor="country" className="block mb-2">
          Country Name
        </label>
        <input
          id="country"
          type="text"
          className="w-full border rounded px-2 py-1"
        />

        <DrawerFooter>
          <DrawerClose asChild>
            <Button
              onClick={() => {
                closeDrawer();
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </DrawerClose>

          <Button
            type="submit"
            onClick={() => {
              console.log('Submitting...');
              closeDrawer(); // Tutup saat submit
            }}
          >
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCountry;
