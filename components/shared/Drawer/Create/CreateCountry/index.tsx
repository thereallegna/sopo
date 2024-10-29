'use client';

import React from 'react';
import { Button } from '@components/ui/Button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@components/ui/Drawer';

import { useDrawerStore } from '@stores/useDrawerStore';

const CreateCountry = () => {
  const isOpen = useDrawerStore((state) => state.isOpen);
  const closeDrawer = useDrawerStore((state) => state.closeDrawer);

  return (
    <Drawer open={isOpen} onOpenChange={closeDrawer}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create Country</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <label htmlFor="country" className="block mb-2">
              Country Name
            </label>
            <input
              id="country"
              type="text"
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <DrawerFooter>
            <Button onClick={closeDrawer} variant="outlined" className="mr-2">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCountry;
