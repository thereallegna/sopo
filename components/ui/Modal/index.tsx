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
  onClose: () => void;
  title: string;
  columns: GenerateColumnsOption;
  queryKey: string;
  queryFn: (option?: FetcherOptions) => Promise<AxiosResponse<any, any>>;
  onSelectRow?: (data: any) => void;
}

const SelectableModal: React.FC<SelectableModalProps> = ({
  isOpen,
  onClose,
  title,
  columns,
  queryKey,
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
          <TableContent {...tableProps} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectableModal;
