"use client";

import React, { Suspense } from "react";
import StockMovementHeaderForm from "@components/module/Reporting/InventoryMaterialManagement/StockMovement/Form/HeaderForm";
import StockMovementDetailForm from "@components/module/Reporting/InventoryMaterialManagement/StockMovement/Form/DetailForm";

const StockMovement = () => (
    <Suspense>
        <div className="overflow-auto p-4">
            <h1 className="text-xl font-bold p-2">Stock Movement</h1>
            <div className="mb-4">
                <StockMovementHeaderForm />
            </div>
            <StockMovementDetailForm />
        </div>
    </Suspense>
);

export default StockMovement;
