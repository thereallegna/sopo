import React from 'react';
import { Button } from '@components/ui/Button';
import IconComponent from '@components/ui/Icon';
import { IconDownload } from '@tabler/icons-react';
import * as XLSX from 'xlsx';

interface ExportButtonProps {
  data: any[];
  columns: any[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ data, columns }) => {
  const exportToExcel = () => {
    if (data.length === 0) {
      alert('No data available to export!');
      return;
    }

    const headers = [...columns.map((col) => col.header || col.accessorKey)];

    const exportData = data.map((item) => [
      ...columns.map((col) => item[col.accessorKey]),
    ]);

    const ws = XLSX.utils.json_to_sheet(exportData, { skipHeader: true });

    headers.forEach((header, index) => {
      ws[XLSX.utils.encode_cell({ r: 0, c: index })] = { v: header, t: 's' };
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Exported Data');

    XLSX.writeFile(wb, 'Exported_Data.xlsx');
  };

  return (
    <Button
      variant="outlined"
      title="Export"
      onClick={exportToExcel}
      className="w-[80px]"
    >
      <IconComponent
        icon={IconDownload}
        size="large"
        color="quaternary"
        className="mr-2"
      />
      Export
    </Button>
  );
};

export default ExportButton;
