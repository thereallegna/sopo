import TableContent from '@components/shared/TableContent';
import useTable from '@hooks/useTable';
import { AxiosResponse } from 'axios';
import React from 'react';
import { FetcherOptions } from '../../../types/client/fetcher';
import { GenerateColumnsOption } from '../../../types/client/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../Dialog';

interface SelectableModalProps {
  isOpen: boolean;
  title: string;
  columns: GenerateColumnsOption;
  queryKey: string;
  multipleSelect?: boolean;
  idSelected?: string;
  valueSelected?: string[];
  onClose: () => void;
  queryFn: (option?: FetcherOptions) => Promise<AxiosResponse<any, any>>;
  onSelectRow?: (data: any) => void;
}

const assignSelected = (
  data?: ApiResultResponse<any[]>,
  multipleSelect?: boolean,
  idSelected?: string,
  valueSelected?: string[]
): ApiResultResponse<any[]> | undefined => {
  if (multipleSelect && idSelected) {
    const results = (data?.results || []).map((val) => {
      const newValue = { ...val }; // Salin objek untuk menghindari mutasi langsung
      valueSelected?.forEach((selectId) => {
        if (newValue[idSelected] === selectId) {
          newValue[idSelected] = true;
        }
      });
      return newValue;
    });

    // Buat salinan data dengan memastikan semua properti sesuai tipe ApiResultResponse
    return {
      results,
      current_page: data?.current_page ?? 1, // Default ke 1 jika undefined
      page_size: data?.page_size ?? 10, // Default ke 10 jika undefined
      total_records: data?.total_records ?? 0,
      total_pages: data?.total_pages ?? 1,
      has_next: data?.has_next ?? false,
      has_previous: data?.has_previous ?? false,
    };
  }
  return data;
};

const SelectableModal: React.FC<SelectableModalProps> = ({
  multipleSelect,
  idSelected,
  valueSelected,
  isOpen,
  title,
  columns,
  queryKey,
  onClose,
  queryFn,
  onSelectRow,
}) => {
  const tableProps = useTable<any[]>({
    queryFn,
    columns,
    queryKey,
    onSelectRow,
    showRowSizeSelector: false,
    showColumnSelector: false,
    showExport: false,
    showPrint: false,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[800px] h-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex-1 w-full overflow-auto">
          <TableContent
            data={assignSelected(
              tableProps.data,
              multipleSelect,
              idSelected,
              valueSelected
            )}
            {...tableProps}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectableModal;
