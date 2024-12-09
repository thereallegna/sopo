import TableContent from '@components/shared/TableContent';
import useTable from '@hooks/useTable';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../Dialog';
import { SelectableModalProps } from '../../../types/client/table';

const assignSelected = (
  data?: ApiResultResponse<any[]>,
  multipleSelect?: boolean,
  idSelected?: string,
  valueSelected?: string[],
  targetIdSelector?: string
): ApiResultResponse<any[]> | undefined => {
  if (multipleSelect && idSelected && targetIdSelector) {
    const results = (data?.results || []).map((val) => {
      const newValue = { ...val };
      valueSelected?.forEach((selectId) => {
        if (newValue[targetIdSelector] === selectId) {
          newValue[idSelected] = true;
        }
      });
      return newValue;
    });

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
  targetIdSelector,
  valueSelected,
  isOpen,
  title,
  columns,
  queryKey,
  pinnedColumns,
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
    pinnedColumns
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[800px] h-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full h-full overflow-auto">
          <TableContent
            {...tableProps}
            data={assignSelected(
              tableProps.data,
              multipleSelect,
              idSelected,
              valueSelected,
              targetIdSelector,
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectableModal;
