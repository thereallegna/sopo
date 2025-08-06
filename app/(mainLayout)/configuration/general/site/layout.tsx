import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Site - TrackwiseIMM",
    description: "Site page.",
};

// ?======================================================//
const SiteLayout = ({ children }: Props) => <>{children}</>;

export default SiteLayout;
