import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Direct Purchase Receive - RUN System R1",
    description: "Direct Purchase Receive page",
};

// ?======================================================//
const DirectPurchaseReceiveLayout = ({ children }: Props) => <>{children}</>;

export default DirectPurchaseReceiveLayout;
