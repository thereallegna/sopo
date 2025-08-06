import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Province - TrackwiseIMM",
    description: "Province page.",
};

// ?======================================================//
const ProvinceLayout = ({ children }: Props) => <>{children}</>;

export default ProvinceLayout;
