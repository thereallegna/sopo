'use client';

import React from 'react';
import {
  IconChevronCompactLeft,
  IconChevronCompactRight,
} from '@tabler/icons-react';
import { Button } from '../Button';

export interface TablePaginationProps {
  page_size: number;
  total_records: number;
  onNext: () => void;
  onPrev: () => void;
}

const TablePagination = ({
  total_records,
  page_size,
  onNext,
  onPrev,
}: TablePaginationProps) => (
  <div className="flex justify-between items-center">
    <div>
      <span className="text-base text-Neutral-500 font-normal">
        Showing{' '}
        <input
          className="w-[28px] h-[28px] border-[1px] border-Neutral-200 rounded-rounded-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center"
          type="number"
          value={page_size}
          placeholder="0"
        />{' '}
        from {total_records} entries.
      </span>
    </div>
    <div className="flex">
      <Button
        variant="outlined"
        onClick={onPrev}
        icon={{ icon: IconChevronCompactLeft }}
        className="rounded-none rounded-s-rounded-1 px-[7px] py-[6px]"
      />
      <Button
        variant="outlined"
        onClick={onNext}
        icon={{ icon: IconChevronCompactRight }}
        className="rounded-none rounded-e-rounded-1 px-[7px] py-[6px]"
      />
    </div>
  </div>
);

export default TablePagination;
