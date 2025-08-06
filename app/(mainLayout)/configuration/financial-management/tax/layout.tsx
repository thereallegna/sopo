import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Tax - TrackwiseIMM",
    description: "Tax page.",
};

// ?======================================================//
const TaxLayout = ({ children }: Props) => <>{children}</>;

export default TaxLayout;
