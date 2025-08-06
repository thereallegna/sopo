import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Reporting - TrackwiseIMM",
    description: "Reporting page.",
};

// ?======================================================//
const ReportingLayout = ({ children }: Props) => <>{children}</>;

export default ReportingLayout;
