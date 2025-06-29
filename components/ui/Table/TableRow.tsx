"use client";

import { useTableContext } from "@context/TableContext";
import { cn } from "@libs/classNames";
import React from "react";

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
    const { type } = useTableContext();
    return (
        <tr
            ref={ref}
            className={cn(
                "py-3 px-4 text-base bg-Neutral-White",
                type === "default" ? "py-3 px-4" : "",
                className
            )}
            {...props}
        />
    );
});
TableRow.displayName = "TableRow";

export default TableRow;
