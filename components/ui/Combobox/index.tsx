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
import { IconSearch } from '@tabler/icons-react';
import IconComponent from '../Icon';

type FrameworkItem = {
  value: string;
  label: string;
};

interface ComboboxProps {
  items: FrameworkItem[];
}

export const Combobox = ({ items }: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');

  const popoverContentId = React.useMemo(
    () => `popover-content-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <textarea
          className="w-[196px] h-[30px] bg-transparent border outline-none rounded-sm resize-none text-base font-normal text-neutral-400 pt-1 pl-2"
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
        />
      </PopoverTrigger>
      <PopoverContent
        id={popoverContentId}
        className="w-[200px] p-0 flex flex-col items-center"
      >
        <Command>
          <div className="flex items-center justify-center w-full p-2">
            <CommandInput
              placeholder="Search"
              className="w-[180px] h-[30px] bg-transparent outline-none border border-neutral-200 rounded-sm pl-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                  item.label.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
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
  );
};

export default Combobox;
