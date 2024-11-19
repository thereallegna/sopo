'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@libs/classNames';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/Popover';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';
import {
  messageInputFieldVariant,
  MessageInputProps,
} from '@components/shared/InputField';
import { AxiosResponse } from 'axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import IconComponent from '../Icon';
import Label, { LabelProps } from '../Label';
import { Button } from '../Button';

type FrameworkItem = {
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

  // Query
  queryKey?: string[];
  queryFn?: (options: FetcherOptions) => Promise<any>;
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
  dataLabel = 'label', // nilai default jika dataLabel tidak disediakan
  dataValue = 'value', // nilai default jika dataValue tidak disediakan
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState<string>();

  const popoverContentId = React.useMemo(
    () => `popover-content-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  const { data: queryData } = useQuery<AxiosResponse<ApiResponse<any[]>>>({
    queryKey: queryKey || [],
    queryFn: queryFn ? () => queryFn({ search: searchQuery }) : undefined,
    placeholderData: keepPreviousData,
    enabled: Boolean(queryFn && queryKey), // hanya melakukan query jika queryFn dan queryKey ada
  });

  return (
    <div className={className}>
      <div className="w-full flex gap-2">
        <Label
          required
          className="shrink-0 w-[100px] font-semibold"
          {...labelProps}
        >
          {label}
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="w-full">
            <Button
              variant="secondary"
              type="button"
              className={`${disabled ? 'bg-Neutral-100' : ''} justify-between`}
              end_icon={{
                icon: IconChevronDown,
              }}
              disabled={disabled}
            >
              <p className="font-normal">{value?.label || placeholder}</p>
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <IconComponent
                  icon={IconSearch}
                  size="small"
                  className="absolute right-4 text-neutral-500"
                />
              </div>
              <CommandList>
                <CommandEmpty>No data found.</CommandEmpty>
                <CommandGroup>
                  {queryData?.data.data.results.map((item) => (
                    <CommandItem
                      key={item[dataValue]}
                      value={item[dataValue]}
                      onSelect={(currentValue) => {
                        onChange?.({
                          label: item[dataLabel],
                          value: currentValue,
                        });
                        setOpen(false);
                      }}
                    >
                      {item[dataLabel]}
                      <Check
                        className={cn(
                          'ml-auto',
                          value && value?.value === item[dataValue]
                            ? 'opacity-100'
                            : 'opacity-0'
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
          className={cn(messageInputFieldVariant({ variant: message.type }))}
        >
          {message.text}
        </span>
      )}
    </div>
  );
};

export default Combobox;
