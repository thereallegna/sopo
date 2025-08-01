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
import { FrameworkItem } from ".";

interface MultiComboboxProps {
    label?: string;
    labelProps?: LabelProps;
    url?: string;
    items?: FrameworkItem[];
    value?: FrameworkItem[];
    placeholder: string;
    message?: MessageInputProps;
    onChange?: (val: FrameworkItem[]) => void;
    disabled?: boolean;
    className?: string;
    required?: boolean;

    // Query
    queryKey: string[];
    queryFn?: (options?: FetcherOptions) => Promise<any>;
    dataLabel?: string;
    dataValue?: string;
}

export const MultiSelectCombobox = ({
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
    required,
    dataLabel = "label", // nilai default jika dataLabel tidak disediakan
    dataValue = "value", // nilai default jika dataValue tidak disediakan
}: MultiComboboxProps) => {
    const [open, setOpen] = React.useState(false);

    const popoverContentId = React.useMemo(
        () => `popover-content-${Math.random().toString(36).substr(2, 9)}`,
        []
    );

    // console.log('Combobox Edit => ', disabled);

    const { data: queryData, isLoading } = useQuery<
        AxiosResponse<ApiResponse<any[]>>
    >({
        queryKey: [...queryKey],
        queryFn: queryFn ? () => queryFn() : undefined,
        placeholderData: keepPreviousData,
        enabled: !disabled,
    });

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
                            <p className="max-w-[210px] truncate font-normal text-start">
                                {value?.map((item) => item.label).join(", ") ||
                                    placeholder}
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
                                    className="absolute right-7 text-neutral-500 "
                                />
                            </div>
                            <CommandList>
                                <CommandEmpty>
                                    {isLoading ? "Loading.." : "No data found."}
                                </CommandEmpty>
                                <CommandGroup>
                                    {queryData?.data?.data?.results.map(
                                        (item) => (
                                            <CommandItem
                                                key={item[dataValue]}
                                                value={item[dataLabel]}
                                                onSelect={() => {
                                                    const isSelected =
                                                        value?.some(
                                                            (selectedItem) =>
                                                                selectedItem.value ===
                                                                item[dataValue]
                                                        );

                                                    const newValue = isSelected
                                                        ? value?.filter(
                                                              (selectedItem) =>
                                                                  selectedItem.value !==
                                                                  item[
                                                                      dataValue
                                                                  ]
                                                          ) || []
                                                        : [
                                                              ...(value || []),
                                                              {
                                                                  label: item[
                                                                      dataLabel
                                                                  ],
                                                                  value: item[
                                                                      dataValue
                                                                  ],
                                                              },
                                                          ];

                                                    onChange?.(newValue);
                                                }}
                                            >
                                                {item[dataLabel]}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        value?.some(
                                                            (selectedItem) =>
                                                                selectedItem.value ===
                                                                item[dataValue]
                                                        )
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        )
                                    )}
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

export default MultiSelectCombobox;
