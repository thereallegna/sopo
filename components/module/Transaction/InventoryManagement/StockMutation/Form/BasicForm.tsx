import React from 'react';
import InputField from '@components/shared/InputField';
import { Card, CardContent } from '@components/ui/Card';
import { Checkbox } from '@components/ui/Checkbox';
import Label from '@components/ui/Label';
import { FormType } from '../../../../../../types/form';

const BasicForm = ({
  errors,
  watch,
  register,
  setValue,
  handleInputKeyDown,
  disableAll, // Pastikan properti ini diterima
}: FormType<MasterItemFormBody> & {
  add?: boolean;
}) => (
  <Card size="drawer" className="border border-Neutral-200 shadow-none">
    <CardContent className="flex-wrap flex flex-row gap-6 items-center">
      <div className="flex flex-col gap-[14px] flex-1">
        <InputField
          {...register('item_name')}
          message={
            errors?.item_name
              ? { text: errors.item_name.message!, type: 'danger' }
              : undefined
          }
          label="Document"
          placeholder="Text here.."
          type="text"
          required
          right
          disabled={disableAll} // Disabled berdasarkan disableAll
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          // {...register('local_code')}
          message={
            errors?.local_code
              ? { text: errors.local_code.message!, type: 'danger' }
              : undefined
          }
          label="Date"
          placeholder="Text here.."
          type="date"
          right
          required
          disabled={disableAll} // Disabled berdasarkan disableAll
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
        <InputField
          // {...register('foreign_name')}
          message={
            errors?.foreign_name
              ? { text: errors.foreign_name.message!, type: 'danger' }
              : undefined
          }
          label="Warehouse"
          placeholder="Text here.."
          type="text"
          right
          required
          disabled={disableAll} // Disabled berdasarkan disableAll
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <div className="flex items-center gap-2">
          <Label className="shrink-0 w-[100px] font-semibold">Cancel</Label>
          <Checkbox
            label="Inventory Item"
            checked={watch('inventory_item')}
            onCheckedChange={(val) =>
              setValue && setValue('inventory_item', val)
            }
            disabled={disableAll} // Disabled berdasarkan disableAll
          />
        </div>
      </div>
      <div className="flex flex-col gap-[14px] flex-1">
        <InputField
          // {...register('foreign_name')}
          message={
            errors?.foreign_name
              ? { text: errors.foreign_name.message!, type: 'danger' }
              : undefined
          }
          label="Reason for Cancellation"
          placeholder="Text here.."
          type="text"
          right
          disabled={disableAll} // Disabled berdasarkan disableAll
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          // {...register('foreign_name')}
          message={
            errors?.foreign_name
              ? { text: errors.foreign_name.message!, type: 'danger' }
              : undefined
          }
          label="Remark"
          placeholder="Text here.."
          type="text"
          right
          disabled={disableAll} // Disabled berdasarkan disableAll
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
      </div>
    </CardContent>
  </Card>
);

export default BasicForm;
