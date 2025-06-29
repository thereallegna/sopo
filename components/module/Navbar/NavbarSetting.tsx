"use client";

import React from "react";
import { IconUser, IconSettings2, IconLogout } from "@tabler/icons-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import IconComponent from "@components/ui/Icon";
import { Button } from "@components/ui/Button";
import { useUserSession } from "@hooks/useUserSession";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@services/fetcher/auth/logout";
import { useRouter } from "next/navigation";

const NavbarSettings = () => {
    const { isLoading, data } = useUserSession();
    const router = useRouter();

    const { mutate: mutationLogout } = useMutation({
        mutationFn: logout,
        onMutate: () => {},
        onSuccess: () => {
            router.push("/login");
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    });

    const handleLogout = () => {
        console.log("check");
        mutationLogout();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full bg-gray-200 p-2 w-7 h-7 flex items-center justify-center">
                    <IconComponent
                        icon={IconUser}
                        size="medium"
                        color="primary"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="bg-white shadow:md rounded-sm w-[180px] h-auto border border-neutral-200 p-2 mr-2 z-50"
                style={{ zIndex: 9999 }}
            >
                <div className="flex items-center p-1">
                    <div className="rounded-full bg-gray-200 p-2 flex items-center justify-center">
                        <IconComponent
                            icon={IconUser}
                            size="medium"
                            color="custom"
                        />
                    </div>
                    <div className="flex flex-col text-base font-semibold ml-[10px]">
                        <span>
                            {isLoading
                                ? "loading..."
                                : data?.usercode || "Guest"}
                        </span>
                        <span className="text-[10px] font-normal">
                            Administrator
                        </span>
                    </div>
                </div>
                <hr className="border-neutral-200 mt-2 -mx-2" />
                <div className="flex items-center mt-0 -mb-2 p-1">
                    <div className="flex items-center justify-center">
                        <IconComponent
                            icon={IconSettings2}
                            size="medium"
                            color="dark"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <Button
                            className="text-[10px] font-normal"
                            variant="navbarSettings"
                        >
                            Configuration
                        </Button>
                    </div>
                </div>
                <hr className="border-neutral-200 mt-2 -mx-2" />
                <div className="flex items-center mt-0 -mb-2 p-1">
                    <div className="flex items-center justify-center">
                        <IconComponent
                            icon={IconLogout}
                            size="medium"
                            color="dark"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <Button
                            className="text-[10px] font-normal"
                            variant="navbarSettings"
                            onClick={handleLogout}
                        >
                            {isLoading ? "Loggin out..." : "Logout"}
                        </Button>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NavbarSettings;
