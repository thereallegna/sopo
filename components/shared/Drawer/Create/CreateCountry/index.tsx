'use client';

import React from 'react';
import { Button } from '@components/ui/Button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerEndHeader,
  DrawerHeader,
} from '@components/ui/Drawer';
import { Card, CardContent } from '@components/ui/Card';
import InputField from '@components/shared/InputField';

import { useDrawerStore } from '@stores/useDrawerStore';
import { IconDeviceFloppy } from '@node_modules/@tabler/icons-react/dist/esm/tabler-icons-react';

const CreateCountry = () => {
  const { isOpen, closeDrawer } = useDrawerStore();

  return (
    <Drawer onClose={closeDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader drawerTitle="Create Country">
          <DrawerEndHeader>
            {/* button save */}
            <Button
              icon={{
                size: 'large',
                icon: IconDeviceFloppy,
                color: 'drawer',
              }}
              onClick={() => {
                console.log('Save');
              }}
            >
              save
            </Button>
          </DrawerEndHeader>
        </DrawerHeader>
        <DrawerBody>
          <Card size="drawer">
            <CardContent className="flex-wrap flex flex-row gap-6 items-center">
              <InputField
                label="Country Code"
                placeholder="Country Code"
                right
                type="text"
              />
              <InputField
                label="Country Name"
                placeholder="Country Name"
                right
                type="text"
              />
              <InputField
                label="Country Name"
                placeholder="Country Name"
                right
                type="text"
              />
              <InputField
                label="Country Name"
                placeholder="Country Name"
                right
                type="text"
              />
            </CardContent>
          </Card>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCountry;
