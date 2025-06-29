import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Stock Mutation - RUN System R1",
    description: "Stock Mutation page.",
};

// ?======================================================//
const StockMutationLayout = ({ children }: Props) => <>{children}</>;

export default StockMutationLayout;
