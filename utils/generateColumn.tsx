import React from 'react';
import {
  AccessorKeyColumnDef,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
// import Input from '@components/ui/Input';
import GoToDetail from '@components/shared/TableContent/ToDetail';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { Checkbox } from '@components/ui/Checkbox';
import InputField from '@components/shared/InputField';
import { Button } from '@components/ui/Button';
import { GenerateColumnsOption } from '../types/client/table';

// const CheckboxInitialStock = ({
//   keyId,
//   value,
//   disableAll,
//   ...props
// }: {
//   keyId: string;
//   value: boolean;
//   disableAll?: boolean;
// } & CheckboxProps) => {
//   const [isChecked, setIsChecked] = useState(value);

//   // Menggunakan useEffect untuk melacak perubahan value setelah render pertama
//   useEffect(() => {
//     // Update isChecked hanya ketika value berubah dan menjadi true
//     if (value) {
//       setIsChecked(true); // Menjaga value tetap checked meskipun tidak disable
//     }
//   }, [value]);

//   return (
//     <Checkbox
//       checked={isChecked} // Kontrol status checked berdasarkan isChecked
//       {...props}
//       disabled={disableAll} // Disable global jika diperlukan
//       onCheckedChange={(checked) => {
//         // Checkbox dapat di-check/uncheck jika isChecked masih false
//         if (!checked || !value) {
//           setIsChecked(checked);
//         }
//         if (props.onCheckedChange) {
//           props.onCheckedChange(checked);
//         }
//       }}
//     />
//   );
// };

export const generateColumns = ({
  key,
  columns,
  hasAction = true,
  disableAll,
  errors,
  onInputChange,
  onCheckedChange,
}: GenerateColumnsOption):
  | AccessorKeyColumnDef<any, any>[]
  | ColumnDef<any, any>[] => {
  const columnHelper = createColumnHelper<any>();

  const resultColumns: ColumnDef<any, any>[] = columns.map((column) =>
    columnHelper.accessor(column.accessor, {
      id: column.accessor,
      header: column.header,
      cell: (props) => {
        const value = props.renderValue();
        const rowIndex = props.row.index; // Dapatkan indeks baris
        const columnId = props.column.id;

        if (column.type === 'button') {
          return <Button data-row-index={rowIndex} {...column.buttonProps} />;
        }

        if (column.type === 'input') {
          let displayValue = value;
          // Jika value adalah 0, tampilkan string kosong
          if (value === 0) {
            displayValue = '';
          } else if (column.inputProps?.type === 'number') {
            displayValue = Number(value);
          }
          return (
            <InputField
              type="small"
              value={displayValue}
              disabled={disableAll}
              onChange={(e) =>
                onInputChange &&
                onInputChange(
                  rowIndex,
                  columnId,
                  e.target.value,
                  column.inputProps?.type
                )
              }
              message={
                errors &&
                errors[key] &&
                errors[key][rowIndex] &&
                errors[key][rowIndex][columnId] &&
                errors[key][rowIndex][columnId]?.message !== undefined
                  ? {
                      text: errors[key][rowIndex][columnId].message,
                      type: 'danger',
                    }
                  : undefined
              }
              inputProps={{
                ...column.inputProps,
                placeholder: value,
                defaultValue: value,
              }}
            />
          );
        }

        if (column.type === 'checkbox') {
          return (
            <Checkbox
              checked={value}
              onCheckedChange={(check) =>
                onCheckedChange && onCheckedChange(rowIndex, columnId, check)
              }
              disabled={disableAll}
              {...column.checkboxProps}
            />
          );
        }

        // if (column.type === 'checkbox-initial-stock') {
        //   return (
        //     <CheckboxInitialStock
        //       key={key}
        //       keyId={key as string}
        //       value={value}
        //       checked={value}
        //       onCheckedChange={(check) =>
        //         onCheckedChange && onCheckedChange(rowIndex, columnId, check)
        //       }
        //       disabled={disableAll}
        //       {...column.checkboxProps}
        //     />
        //   );
        // }

        if (typeof value === 'boolean') {
          return value ? (
            <IconCircleCheckFilled size={16} className="text-Green-500" />
          ) : null;
        }

        return value;
      },
      enableGrouping: true,
      size: column.size,
    })
  );

  if (hasAction) {
    resultColumns.push(
      columnHelper.display({
        id: 'action',
        cell: (props) => <GoToDetail data={props.row.original} />,
      })
    );
  }

  return resultColumns;
};
