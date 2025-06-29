import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Stock Movement - RUN System R1",
    description: "Stock Movement page",
};

// ?======================================================//
const StockMovementLayout = ({ children }: Props) => <>{children}</>;

export default StockMovementLayout;
