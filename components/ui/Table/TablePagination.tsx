'use client';

import React from 'react';
import {
  IconChevronCompactLeft,
  IconChevronCompactRight,
} from '@tabler/icons-react';
import { Button, ButtonProps } from '../Button';
import PageSizeInput from './PageSizeInput';

export interface TablePaginationProps {
  page_index: number;
  page_size: number;
  total_records?: number;
  total_pages?: number;
  nextButtonProps?: ButtonProps;
  prevButtonProps?: ButtonProps;
  onNext: () => void;
  onPrev: () => void;
  onChangePageSize: (size: number) => void;
}

const TablePagination = ({
  page_index,
  total_records,
  page_size,
  total_pages,
  onChangePageSize,
  onNext,
  onPrev,
  nextButtonProps,
  prevButtonProps,
}: TablePaginationProps) => (
  <div className="flex justify-between items-center">
    <div>
      <span className="text-base text-Neutral-500 font-normal flex items-center">
        Showing{' '}
        <PageSizeInput
          helperValues={[10, 20, 40, 80]}
          type="number"
          value={page_size}
          placeholder="0"
          onChangePageSize={(val) => onChangePageSize(val)}
        />{' '}
        from {total_records} entries.
      </span>
    </div>
    <div className="flex items-center gap-[10px]">
      <div className="flex">
        <Button
          size="icon"
          variant="secondary"
          onClick={onPrev}
          icon={{ icon: IconChevronCompactLeft }}
          className="rounded-none rounded-s-rounded-1 px-[7px] py-[6px]"
          {...prevButtonProps}
        />
        <Button
          size="icon"
          variant="secondary"
          onClick={onNext}
          icon={{ icon: IconChevronCompactRight }}
          className="rounded-none rounded-e-rounded-1 px-[7px] py-[6px]"
          {...nextButtonProps}
        />
      </div>
      <p className="text-base text-Neutral-500 font-normal">
        Page {page_index} of {total_pages}{' '}
      </p>
    </div>
  </div>
);

export default TablePagination;
