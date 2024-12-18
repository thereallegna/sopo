import { UseFormSetValue, Path, PathValue } from 'react-hook-form';
import { useEffect } from 'react';
import { parse, isValid } from 'date-fns'; // Import date-fns
import { convertDate } from '@utils/converter';

export const useSetValueForm = <T extends Record<string, any>>(
  detailData: T,
  setValue: UseFormSetValue<T>,
  dependencies?: any
) => {
  useEffect(() => {
    if (detailData) {
      (Object.keys(detailData) as Array<keyof T>).forEach((key) => {
        let val = detailData[key];

        // If the value is a string, try to parse it as a date
        if (typeof val === 'string') {
          const parsedDate = parse(val, 'dd/MMM/yyyy', new Date());
          if (isValid(parsedDate)) {
            // If it's a valid date, convert it using `convertDate`
            val = convertDate(val) as any;
          }
        }

        // Ensure the value being set is of the correct type for the form
        if (val !== undefined && val !== null) {
          setValue(key as Path<T>, val as PathValue<T, Path<T>>); // Type assertion to ensure the correct value type
        }
      });
    }
  }, [detailData, setValue, dependencies]); // Re-run when detailData changes
};
