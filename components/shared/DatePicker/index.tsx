'use client';

import * as React from 'react';
import { format } from 'date-fns';

import { Button } from '@components/ui/Button';
import { Calendar } from '@components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/Popover';
import {
  messageInputFieldVariant,
  MessageInputProps,
} from '@components/shared/InputField';
import Label from '../../ui/Label';

interface DatePickerProps {
  label?: string;
  value?: Date;
  placeholder: string;
  onChange?: (date: Date) => void;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  message?: MessageInputProps;
}

export const DatePicker = ({
  label,
  value,
  placeholder,
  onChange,
  disabled,
  className,
  required,
  message,
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onChange?.(selectedDate);
      setOpen(false);
    }
  };

  return (
    <div className={className}>
      <div className="w-full flex gap-2">
        {label && (
          <Label
            required={required}
            className="shrink-0 w-[100px] font-semibold"
          >
            {label}
          </Label>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className={`w-full justify-between font-normal ${
                !date ? 'text-muted-foreground' : ''
              } ${disabled ? 'bg-neutral-100' : ''}`}
              disabled={disabled}
            >
              {date ? format(date, 'PPP') : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {message && (
        <span className={messageInputFieldVariant({ variant: message.type })}>
          {message.text}
        </span>
      )}
    </div>
  );
};

export default DatePicker;
