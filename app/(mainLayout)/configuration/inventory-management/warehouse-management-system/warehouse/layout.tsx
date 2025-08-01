import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Warehouse - RUN System R1",
    description: "Warehouse page.",
};

// ?======================================================//
const WarehouseLayout = ({ children }: Props) => <>{children}</>;

export default WarehouseLayout;
