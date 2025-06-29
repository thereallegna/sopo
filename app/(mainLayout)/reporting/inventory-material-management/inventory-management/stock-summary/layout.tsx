import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Stock Summary - RUN System R1",
    description: "Stock Summary page",
};

// ?======================================================//
const StockSummaryLayout = ({ children }: Props) => <>{children}</>;

export default StockSummaryLayout;
