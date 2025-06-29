"use client";

import { useTableContext } from "@context/TableContext";
import { cn } from "@libs/classNames";
import React from "react";

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
    const { type } = useTableContext();
    return (
        <thead
            ref={ref}
            className={cn(
                type === "default"
                    ? "bg-Neutral-100 border-b-[1px] border-Neutral-200"
                    : "",
                className
            )}
            {...props}
        />
    );
});
TableHeader.displayName = "TableHeader";

export default TableHeader;
