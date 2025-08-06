import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Warehouse - TrackwiseIMM",
    description: "Warehouse page.",
};

// ?======================================================//
const WarehouseLayout = ({ children }: Props) => <>{children}</>;

export default WarehouseLayout;
