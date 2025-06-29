"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@libs/classNames";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@components/ui/Command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@components/ui/Popover";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import {
    messageInputFieldVariant,
    MessageInputProps,
} from "@components/shared/InputField";
import { AxiosResponse } from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import IconComponent from "../../ui/Icon";
import Label, { LabelProps } from "../../ui/Label";
import { Button } from "../../ui/Button";
import { FetcherOptions } from "../../../types/client/fetcher";

export type FrameworkItem = {
    value: string;
    label: string;
};

interface ComboboxProps {
    label?: string;
    labelProps?: LabelProps;
    url?: string;
    items?: FrameworkItem[];
    value?: FrameworkItem;
    placeholder: string;
    message?: MessageInputProps;
    onChange?: (val: FrameworkItem) => void;
    disabled?: boolean;
    className?: string;
    required?: boolean;

    // Query
    queryKey?: string[]; // Made optional for cases where only manual data is used
    queryFn?: (options?: FetcherOptions) => Promise<any>;
    data?: FrameworkItem[]; // Added property for manual array data
    dataLabel?: string;
    dataValue?: string;
}

export const Combobox = ({
    value,
    label,
    labelProps,
    message,
    placeholder,
    onChange,
    disabled,
    className,
    queryKey,
    queryFn,
    data, // Manual data
    required,
    dataLabel = "label",
    dataValue = "value",
}: ComboboxProps) => {
    const [open, setOpen] = React.useState(false);

    const popoverContentId = React.useMemo(
        () => `popover-content-${Math.random().toString(36).substr(2, 9)}`,
        []
    );

    const { data: queryData, isLoading } = useQuery<
        AxiosResponse<ApiResponse<any[]>>
    >({
        queryKey: queryKey || [], // Fallback to an empty array when no queryKey is provided
        queryFn: queryFn ? () => queryFn() : undefined,
        placeholderData: keepPreviousData,
        enabled: queryFn && !disabled, // Only fetch if queryFn is provided and not disabled
    });

    // Combine query data with manual data (if both are provided)
    const combinedData = React.useMemo(() => {
        if (data) return data; // Use manual data if provided
        return queryData?.data?.data?.results || []; // Otherwise, use fetched data
    }, [data, queryData]);

    return (
        <div className={className}>
            <div className="w-full flex gap-2">
                <Label
                    required={required}
                    className="shrink-0 w-[100px] font-semibold"
                    {...labelProps}
                >
                    {label}
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger className="w-full" asChild>
                        <Button
                            variant="secondary"
                            type="button"
                            className={`${
                                disabled ? "bg-Neutral-100" : ""
                            } justify-between`}
                            end_icon={{
                                icon: IconChevronDown,
                            }}
                            disabled={disabled}
                        >
                            <p className="font-normal">
                                {value?.label || placeholder}
                            </p>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        id={popoverContentId}
                        className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0 flex flex-col items-center border mt-2 overflow-hidden"
                    >
                        <Command className="w-full">
                            <div className="flex items-center justify-center w-full p-2">
                                <div className="w-full flex-1">
                                    <CommandInput
                                        placeholder="Search"
                                        className="h-[30px] outline-none border border-neutral-200 w-full rounded-sm pl-2"
                                    />
                                </div>
                                <IconComponent
                                    icon={IconSearch}
                                    size="small"
                                    className="absolute right-4 text-neutral-500"
                                />
                            </div>
                            <CommandList>
                                <CommandEmpty>
                                    {isLoading ? "Loading.." : "No data found."}
                                </CommandEmpty>
                                <CommandGroup>
                                    {combinedData.map((item) => (
                                        <CommandItem
                                            key={item[dataValue]}
                                            value={item[dataLabel]}
                                            onSelect={() => {
                                                onChange?.({
                                                    label: item[dataLabel],
                                                    value: item[dataValue],
                                                });
                                                setOpen(false);
                                            }}
                                        >
                                            {item[dataLabel]}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    value &&
                                                        value?.value ===
                                                            item[dataValue]
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            {message && (
                <span
                    className={cn(
                        messageInputFieldVariant({ variant: message.type })
                    )}
                >
                    {message.text}
                </span>
            )}
        </div>
    );
};

export default Combobox;
