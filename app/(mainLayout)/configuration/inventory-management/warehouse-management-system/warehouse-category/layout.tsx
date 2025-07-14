import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Warehouse Category - RUN System R1",
    description: "Warehouse Category page.",
};

// ?======================================================//
const WarehouseCategoryLayout = ({ children }: Props) => <>{children}</>;

export default WarehouseCategoryLayout;
