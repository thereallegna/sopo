'use client';

import React from 'react';
import { useDrawerStore } from '@stores/useDrawerStore';

const HeaderContent = () => {
  const openDrawer = useDrawerStore((state) => state.openDrawer);

  const handleOpenDrawer = () => {
    openDrawer('CREATE_COUNTRY');
  };

  return (
    <div className="flex items-center justify-between p-4 bg-red-500">
      <h1 className="text-xl font-bold">Header Conaowdjoiawjdoitent</h1>
      <button
        type="button"
        onClick={handleOpenDrawer}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Create Country Modal
      </button>
    </div>
  );
};

export default HeaderContent;
