'use client';

import React from 'react';
import { Button } from '@components/ui/Button';
import {
  Drawer,
  DrawerBody,
  DrawerButtonHeader,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@components/ui/Drawer';

import { useDrawerStore } from '@stores/useDrawerStore';

const CreateCountry = () => {
  const isOpen = useDrawerStore((state) => state.isOpen);
  const closeDrawer = useDrawerStore((state) => state.closeDrawer);

  return (
    <Drawer open={isOpen}>
      <DrawerBody>
        <DrawerHeader>
          <DrawerTitle>Create Country</DrawerTitle>
          <DrawerButtonHeader>
            <h1>adwokawod</h1>
            <h1>adwokawod</h1>
          </DrawerButtonHeader>
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
          <Button onClick={closeDrawer} variant="outlined" className="mr-2">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </DrawerFooter>
      </DrawerBody>
    </Drawer>
  );
};

export default CreateCountry;
