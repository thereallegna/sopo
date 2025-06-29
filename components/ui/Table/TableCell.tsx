"use client";

import { useTableContext } from "@context/TableContext";
import { cn } from "@libs/classNames";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const tableCellVariant = cva("text-base text-Neutral-Black", {
    variants: {
        size: {
            normal: "py-[5px] px-[10px]",
            compact: "py-1 px-[10px]",
            narrow: "px-2",
            form: "p-0",
        },
        columnPinning: {
            true: "sticky left-0",
            false: "",
        },
    },
    defaultVariants: {
        columnPinning: false,
        size: "normal",
    },
});

export interface TableCellProps
    extends React.TdHTMLAttributes<HTMLTableCellElement>,
        VariantProps<typeof tableCellVariant> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ className, size, ...props }, ref) => {
        const { type } = useTableContext();
        return (
            <td
                className={cn(
                    tableCellVariant({
                        size: type === "form" ? type : size,
                        className,
                    })
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
TableCell.displayName = "TableCell";

export default TableCell;
