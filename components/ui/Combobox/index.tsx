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
  items: FrameworkItem[];
  value: string;
  placeholder: string;
  message?: MessageInputProps;
  onChange?: (val: string) => void;
  disabled?: boolean;
}

export const Combobox = ({
  value,
  items,
  label,
  labelProps,
  message,
  placeholder,
  onChange,
  disabled,
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const popoverContentId = React.useMemo(
    () => `popover-content-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  return (
    <div>
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
              className="justify-between"
              end_icon={{
                icon: IconChevronDown,
              }}
              disabled={disabled}
            >
              <p className="font-normal">{value || placeholder}</p>
            </Button>
            {/* <InputField
              // className="w-[196px] h-[30px] bg-transparent border outline-none rounded-sm resize-none text-base font-normal text-neutral-400 pt-1 pl-2"
              role="combobox"
              aria-expanded={open}
              aria-controls={popoverContentId}
              value={
                value
                  ? items.find((item) => item.value === value)?.label
                  : 'Text here..'
              }
              readOnly
              onFocus={() => setOpen(true)}
            /> */}
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
                  {items
                    .filter((item) =>
                      item.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          onChange?.(currentValue);
                          setOpen(false);
                        }}
                      >
                        {item.label}
                        <Check
                          className={cn(
                            'ml-auto',
                            value === item.value ? 'opacity-100' : 'opacity-0'
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
