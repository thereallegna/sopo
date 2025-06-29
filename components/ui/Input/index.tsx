"use client";

import * as React from "react";
import { cn } from "@libs/classNames";
import { cva, VariantProps } from "class-variance-authority";
import IconComponent, { IconProps } from "@components/ui/Icon";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

const inputVariant = cva(
    "w-full flex items-center px-3 gap-[8px] border-[1px] rounded-[6px] shadow-sm focus-within:outline-none focus-within:ring-[2px]",
    {
        variants: {
            theme: {
                normal: "focus-within:ring-blue-200 text-Neutral-500",
                success: "focus-within:ring-Green-200 text-Green-500",
                warning: "focus-within:ring-Yellow-200 text-Yellow-500",
                danger: "focus-within:ring-Red-200 text-Red-500",
            },
            sizes: {
                small: "text-base py-[6px] gap-[8px] rounded-[6px]",
                medium: "text-lg py-[7px] gap-[8px] rounded-[6px]",
                large: "text-xl py-[8px] gap-[8px] rounded-[6px]",
            },
        },
        defaultVariants: {
            theme: "normal",
            sizes: "small",
        },
    }
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
        VariantProps<typeof inputVariant> {
    start_icon?: IconProps;
    end_icon?: IconProps;
    iconClassName?: string;
    textarea?: boolean; // New prop to enable textarea
}

const Input = React.forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    InputProps
>(
    (
        {
            className,
            theme,
            type,
            start_icon: StartIcon,
            end_icon: EndIcon,
            sizes,
            iconClassName,
            disabled,
            textarea,
            ...props
        },
        ref
    ) => {
        const [showPw, setShowPw] = React.useState<boolean>(false);

        // Toggle password visibility
        const handleTogglePassword = () => {
            setShowPw((prev) => !prev);
        };

        let inputType = type;
        if (type === "password") {
            inputType = showPw ? "text" : "password";
        }

        // Determine the correct icon to show for password input
        let passwordIcon = null;
        if (type === "password" && !textarea) {
            passwordIcon = showPw ? (
                <IconComponent
                    icon={IconEyeClosed}
                    className={cn("text-current cursor-pointer", iconClassName)}
                    onClick={handleTogglePassword}
                    data-testid="password-icon"
                />
            ) : (
                <IconComponent
                    icon={IconEye}
                    className={cn("text-current cursor-pointer", iconClassName)}
                    onClick={handleTogglePassword}
                    data-testid="password-icon"
                />
            );
        }

        return (
            <div
                className={cn(
                    disabled ? "bg-Neutral-100" : "",
                    inputVariant({ className, theme, sizes })
                )}
            >
                {StartIcon && (
                    <IconComponent data-testid="start-icon" {...StartIcon} />
                )}
                {textarea ? (
                    <textarea
                        className={cn(
                            "w-full outline-none bg-transparent",
                            className
                        )}
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        disabled={disabled}
                        {...props}
                    />
                ) : (
                    <input
                        type={inputType}
                        className={cn(
                            "w-full outline-none bg-transparent",
                            className
                        )}
                        ref={ref as React.Ref<HTMLInputElement>}
                        disabled={disabled}
                        {...props}
                    />
                )}
                {passwordIcon}
                {EndIcon && (
                    <IconComponent data-testid="end-icon" {...EndIcon} />
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
