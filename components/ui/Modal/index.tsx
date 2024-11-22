import TableContent from '@components/shared/TableContent';
import useTable from '@hooks/useTable';
import { AxiosResponse } from 'axios';
import { IconX } from '@tabler/icons-react';
import React from 'react';
import { FetcherOptions } from '../../../types/client/fetcher';
import { GenerateColumnsOption } from '../../../types/client/table';
import IconComponent from '../Icon';

interface SelectableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  title: string;
  columns: GenerateColumnsOption;
  queryKey: string;
  queryFn: (option?: FetcherOptions) => Promise<AxiosResponse<any, any>>;
}

const SelectableModal: React.FC<SelectableModalProps> = ({
  isOpen,
  onClose,
  title,
  columns,
  queryKey,
  queryFn,
}) => {
  const tableProps = useTable<any[]>({
    queryFn,
    columns,
    queryKey,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-[800px] h-[500px] shadow-lg flex flex-col">
        <div className="flex justify-between items-center mb-[12px]">
          <h2 className="text-lg font-bold">{title}</h2>
          <IconComponent
            onClick={onClose}
            size="large"
            icon={IconX}
            className="cursor-pointer"
          />
        </div>
        <div className="flex-1 overflow-y-auto z-50">
          <TableContent {...tableProps} />
        </div>
      </div>
    </div>
  );
};

export default SelectableModal;
