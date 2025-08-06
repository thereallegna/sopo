import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Initial Stock - TrackwiseIMM",
    description: "Initial Stock page",
};

// ?======================================================//
const InitialStockLayout = ({ children }: Props) => <>{children}</>;

export default InitialStockLayout;
