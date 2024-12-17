import { PaginationState } from '@tanstack/react-table';

type FetcherOptions = {
  pagination?: PaginationState;
  search?: string;
  all?: boolean;
  active?: boolean;
  query?: object;
};
