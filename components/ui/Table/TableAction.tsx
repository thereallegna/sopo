import React, { useState } from 'react';
import {
  IconLayoutNavbar,
  IconTablePlus,
  IconChevronDown,
  IconPrinter,
  IconDownload,
  IconSearch,
  IconAdjustments,
} from '@tabler/icons-react';
import Input from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Checkbox } from '@components/ui/Checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import IconComponent from '@components/ui/Icon';
import * as XLSX from 'xlsx';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface TableActionProps {
  data: any[];
  onSearch: (keyword: string) => void;
}

const TableAction: React.FC<TableActionProps> = ({ data, onSearch }) => {
  const [checkboxStates, setCheckboxStates] = useState({
    showAll: false,
    code: false,
    name: false,
    createData: false,
    shortName: false,
    active: false,
    tax: false,
    phone: false,
    address: false,
    city: false,
  });

  const handleCheckboxChange = (key: keyof typeof checkboxStates) => {
    setCheckboxStates((prev: typeof checkboxStates) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const checkboxItems: { label: string; key: keyof typeof checkboxStates }[] = [
    { label: 'Show All', key: 'showAll' },
    { label: 'Code', key: 'code' },
    { label: 'Name', key: 'name' },
    { label: 'Create Data', key: 'createData' },
    { label: 'Short Name', key: 'shortName' },
    { label: 'Active', key: 'active' },
    { label: 'Tax', key: 'tax' },
    { label: 'Phone', key: 'phone' },
    { label: 'Address', key: 'address' },
    { label: 'City', key: 'city' },
  ];

  const exportToExcel = () => {
    if (data.length === 0) {
      alert('No data available to export!');
      return;
    }

    const keys = Object.keys(data[0]);

    const exportData = data.map((item: any, index: number) => {
      const rowData: any = { No: index + 1 };
      keys.forEach((key) => {
        rowData[key] = item[key];
      });
      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Exported Data');

    XLSX.writeFile(wb, 'Exported_Data.xlsx');
  };

  const printToPDF = () => {
    if (data.length === 0) {
      alert('No data available to print!');
      return;
    }

    const doc = new JsPDF();
    doc.setFontSize(12);

    doc.text('Exported Data', 14, 10);

    const headers = Object.keys(data[0]);

    const tableData = data.map((item: any) =>
      headers.map((header) => item[header])
    );

    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 20,
    });

    doc.save('Exported_Data.pdf');
  };

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-2 flex-1 w-full">
        <Input
          placeholder="Search.."
          end_icon={{
            icon: IconSearch,
            className: 'text-[#354052]',
          }}
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button variant="secondary" className="w-min">
          <IconComponent icon={IconAdjustments} size="large" className="mr-2" />
          Filter
        </Button>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="bg-white border border-neutral-200 rounded-sm flex items-center justify-between p-[7px_10px] cursor-pointer">
                <div className="flex items-center gap-2">
                  <IconComponent icon={IconLayoutNavbar} size="large" />
                  <IconComponent icon={IconChevronDown} size="large" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white shadow-md rounded-md w-[124px] h-[96px] border border-neutral-200 p-2 mt-2"
              sideOffset={8}
              align="start"
            >
              {['Normal', 'Compact', 'Narrow'].map((label) => (
                <DropdownMenuCheckboxItem
                  key={label}
                  className="text-base font-normal p-[5px_12px] flex items-center gap-2"
                >
                  <IconComponent icon={IconLayoutNavbar} size="large" />
                  {label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="bg-white border border-neutral-200 rounded-[6px] flex items-center justify-between p-[7px_10px] cursor-pointer">
                <div className="flex items-center gap-2">
                  <IconComponent icon={IconTablePlus} size="large" />
                  <IconComponent icon={IconChevronDown} size="large" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white shadow-md rounded-md w-[140px] h-full border border-neutral-200 p-2 mt-2"
              sideOffset={8}
              align="start"
            >
              {checkboxItems.map(({ label, key }) => (
                <DropdownMenuCheckboxItem
                  key={String(key)}
                  className="text-base font-normal p-[6px] flex items-center gap-2"
                  checked={checkboxStates[key]}
                  onCheckedChange={() => handleCheckboxChange(key)}
                >
                  <Checkbox
                    checked={checkboxStates[key]}
                    onCheckedChange={() => handleCheckboxChange(key)}
                  />
                  {label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="relative flex items-center mr-4 gap-2">
          <Button variant="outlined" title="Print" onClick={printToPDF}>
            <IconComponent
              icon={IconPrinter}
              size="large"
              color="quaternary"
              className="mr-2"
            />
            Print
          </Button>
          <Button variant="outlined" title="Export" onClick={exportToExcel}>
            <IconComponent
              icon={IconDownload}
              size="large"
              color="quaternary"
              className="mr-2"
            />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableAction;
