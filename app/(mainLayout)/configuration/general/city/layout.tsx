import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "City - TrackwiseIMM",
    description: "City page.",
};

// ?======================================================//
const CityLayout = ({ children }: Props) => <>{children}</>;

export default CityLayout;
