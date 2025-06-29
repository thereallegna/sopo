import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Items UoM - RUN System R1",
    description: "Items UoM page.",
};

// ?======================================================//
const ItemsUomLayout = ({ children }: Props) => <>{children}</>;

export default ItemsUomLayout;
