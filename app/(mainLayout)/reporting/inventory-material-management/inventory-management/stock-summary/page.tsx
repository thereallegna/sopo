'use client';

import React, { Suspense } from 'react';
import StockSummaryHeaderForm from '@components/module/Reporting/InventoryMaterialManagement/StockSummary/Form/HeaderForm';
import StockSummaryDetailForm from '@components/module/Reporting/InventoryMaterialManagement/StockSummary/Form/DetailForm';

const StockSummary = () => (
  <Suspense>
    <div className="overflow-auto p-4">
      <h1 className="text-xl font-bold p-2">Stock Summary</h1>
      <div className="mb-4">
        <StockSummaryHeaderForm />
      </div>
      <StockSummaryDetailForm />
    </div>
  </Suspense>
);

export default StockSummary;
