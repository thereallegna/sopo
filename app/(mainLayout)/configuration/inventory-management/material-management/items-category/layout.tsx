import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Items Category - TrackwiseIMM",
    description: "Items Category page",
};

// ?======================================================//
const ItemsCategoryLayout = ({ children }: Props) => <>{children}</>;

export default ItemsCategoryLayout;
