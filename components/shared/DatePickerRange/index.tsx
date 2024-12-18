'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@libs/classNames';
import { Button } from '@components/ui/Button';
import { Calendar } from '@components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/Popover';
import { DateRange } from 'react-day-picker';
import Label from '../../ui/Label';

interface DatePickerRangeProps {
  label?: string;
  value?: DateRange;
  placeholder: string;
  onChange?: (date: DateRange | undefined) => void;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  right?: boolean;
}

export const DatePickerRange = ({
  label,
  value,
  placeholder,
  right,
  onChange,
  disabled,
  className,
  required,
}: DatePickerRangeProps) => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    value
  );

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    onChange?.(range);
    if (range?.from && range?.to) {
      setOpen(false);
    }
  };

  const getFormattedDateRange = () => {
    if (!dateRange?.from) return placeholder;
    const start = format(dateRange.from, 'dd');
    const end = dateRange.to ? format(dateRange.to, 'dd') : '...';
    const monthYear = format(dateRange.to || dateRange.from, 'MMM yyyy');
    return `${start} - ${end} ${monthYear}`;
  };

  return (
    <div className={className}>
      <div className="w-full flex">
        {/* {label && (
          <Label
            required={required}
            className="shrink-0 w-[100px] font-semibold"
          >
            {label}
          </Label>
        )} */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div
              className={`flex w-full ${
                right
                  ? 'flex-row  items-center gap-2 self-stretch'
                  : 'flex-col gap-1'
              }`}
            >
              {label && (
                <Label
                  required={required}
                  className="shrink-0 w-[100px] font-semibold"
                >
                  {label}
                </Label>
              )}
              <Button
                variant="outline"
                type="button"
                className={cn(
                  'flex-1 w-full justify-between font-normal',
                  !dateRange?.from && 'text-muted-foreground',
                  disabled && 'bg-neutral-100'
                )}
                disabled={disabled}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>{getFormattedDateRange()}</span>
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DatePickerRange;
