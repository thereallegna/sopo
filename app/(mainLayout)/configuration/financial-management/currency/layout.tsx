import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Currency - RUN System R1",
    description: "Currency page.",
};

// ?======================================================//
const CurrencyLayout = ({ children }: Props) => <>{children}</>;

export default CurrencyLayout;
