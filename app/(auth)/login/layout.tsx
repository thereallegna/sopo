import React from "react";
import { Metadata } from "next";

type Props = {
    children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Login - TrackwiseIMM",
    description: "Login page.",
};

// ?======================================================//
const LoginLayout = ({ children }: Props) => <>{children}</>;

export default LoginLayout;
