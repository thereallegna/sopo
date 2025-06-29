import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@libs/classNames";

const cardVariants = cva("rounded-xl bg-white shadow-lg w-full", {
    variants: {
        size: {
            login: "max-w-[600px] p-[20px] w-[340px] ",
            password: "p-[20px] w-[280px] h-auto",
            modal: "p-[10px] w-[400px] h-auto",
            master_data: "p-[20px] w-[960px]",
            drawer: "w-full p-5",
        },
        variant: {
            default: "bg-white",
        },
    },
    defaultVariants: {
        size: "login",
        variant: "default",
    },
});

const Card = React.forwardRef<
    HTMLDivElement,
    VariantProps<typeof cardVariants> & React.HTMLAttributes<HTMLDivElement>
>(({ className, size, variant, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(cardVariants({ size, variant, className }))}
        {...props}
    />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("leading-none tracking-tight", className)}
        {...props}
    >
        {props.children || "Default Heading"}
    </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-black dark:text-neutral-400", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
