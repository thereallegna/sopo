import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Vendor Category - TrackwiseIMM",
    description: "Vendor Category page.",
};

// ?======================================================//
const VendorCategoryLayout = ({ children }: Props) => <>{children}</>;

export default VendorCategoryLayout;
