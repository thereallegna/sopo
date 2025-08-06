import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Stock Mutation - TrackwiseIMM",
    description: "Stock Mutation page.",
};

// ?======================================================//
const StockMutationLayout = ({ children }: Props) => <>{children}</>;

export default StockMutationLayout;
