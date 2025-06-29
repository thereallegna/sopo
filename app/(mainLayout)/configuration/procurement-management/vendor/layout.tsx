import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Vendor - RUN System R1",
    description: "Vendor page.",
};

// ?======================================================//
const VendorCategory = ({ children }: Props) => <>{children}</>;

export default VendorCategory;
