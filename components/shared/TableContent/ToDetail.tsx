"use client";

import React from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Button } from "@components/ui/Button";
import { useDrawerStore } from "@stores/useDrawerStore";

const GoToDetail = ({ data }: { data: any }) => {
    const openDetailDrawer = useDrawerStore((state) => state.openDetailDrawer);
    return (
        <Button
            icon={{
                icon: IconArrowUpRight,
                color: "secondary",
            }}
            variant="navbarSettings"
            onClick={() => openDetailDrawer(data)}
        />
    );
};

export default GoToDetail;
