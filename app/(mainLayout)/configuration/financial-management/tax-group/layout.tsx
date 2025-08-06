import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Tax Group - TrackwiseIMM",
    description: "Tax Group page.",
};

// ?======================================================//
const TaxGroupLayout = ({ children }: Props) => <>{children}</>;

export default TaxGroupLayout;
