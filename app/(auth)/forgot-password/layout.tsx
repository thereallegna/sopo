import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Forgot Password - TrackwiseIMM",
    description: "Forgot Password Page.",
};

// ?======================================================//
const ForgotPasswordLayout = ({ children }: Props) => <>{children}</>;

export default ForgotPasswordLayout;
