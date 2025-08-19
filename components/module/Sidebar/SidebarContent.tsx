"use client";

import React from "react";
import { sidebarConstant } from "@constants/sidebarConstant";
import { useAuth } from "@context/AuthContext";
import SidebarItems from "./SidebarItems";

interface SidebarContentProps {
    userRole: string;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ userRole }) => {
    const { role, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="px-3 py-2 text-sm text-gray-400">
                Loading menu...
            </div>
        );
    }

    if (!role) {
        return (
            <div className="px-3 py-2 text-sm text-red-400">Role not found</div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 overflow-x-hidden">
            {userRole === "ADMIN"}
            {userRole === "PROCUREMENT"}
            {userRole === "WAREHOUSE"}
            {userRole === "UNKNOWN"}
            <SidebarItems items={sidebarConstant} role={role} />
        </div>
    );
};

export default SidebarContent;
