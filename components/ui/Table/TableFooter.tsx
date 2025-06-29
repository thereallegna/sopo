"use client";

import { cn } from "@libs/classNames";
import React from "react";

const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn(
            "border-t bg-neutral-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-neutral-800/50",
            className
        )}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

export default TableFooter;
