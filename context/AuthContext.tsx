"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useUserSession } from "@hooks/useUserSession";

type AuthContextType = {
    role: string;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    role: "",
    isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data, isLoading } = useUserSession();
    const role = data?.role ?? "";

    const contextValue = useMemo(
        () => ({ role, isLoading }),
        [role, isLoading]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
