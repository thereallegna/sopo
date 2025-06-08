import React from 'react';
import InputField from '@components/shared/InputField';
import { Card, CardContent } from '@components/ui/Card';
import { IconSearch, IconX } from '@tabler/icons-react';
import { Checkbox } from '@components/ui/Checkbox';
import { Button } from '@components/ui/Button';
import Label from '@components/ui/Label';
import { FormType } from '../../../../../../../types/form';

const BasicForm = ({
  errors,
  watch,
  register,
  setValue,
  handleInputKeyDown,
  handleShowSource,
  disableAll, // Pastikan properti ini diterima
  type = 'add',
}: FormType<MasterItemFormBody> & {
  handleShowSource?: () => void;
  type?: 'add' | 'edit';
}) => (
  <Card size="drawer" className="border border-Neutral-200 shadow-none">
    <CardContent className="flex-wrap flex flex-row gap-6 items-center">
      <div className="flex flex-col gap-[14px] flex-1">
        <div className="flex gap-6">
          <div className="flex items-center gap-[10px]">
            <InputField
              {...register('item_code')}
              message={
                errors?.item_code
                  ? {
                      text: errors.item_code.message!,
                      type: 'danger',
                    }
                  : undefined
              }
              label="Item Code"
              type="text"
              right
              disabled={disableAll || true} // Disabled berdasarkan disableAll
              className="w-full gap-2"
              onKeyDown={handleInputKeyDown}
            />
            <Checkbox
              label="Active"
              checked={type === 'add' ? true : watch('active')}
              onCheckedChange={(val) => setValue && setValue('active', val)}
              disabled={disableAll || type === 'add'} // Disabled berdasarkan disableAll
            />
          </div>
          <div className="flex items-center gap-[10px]">
            <InputField
              {...register('source')}
              message={
                errors?.source
                  ? { text: errors.source.message!, type: 'danger' }
                  : undefined
              }
              label="Source"
              type="text"
              right
              disabled={
                disableAll || watch('source') === undefined || type === 'edit'
              }
              className="w-full gap-2"
              onKeyDown={handleInputKeyDown}
              readOnly={disableAll} // Disabled jika disableAll true
              inputProps={{
                onClick: handleShowSource,
              }}
            />
            {(() => {
              if (type !== 'edit' && !disableAll) {
                return watch('source') ? (
                  <Button
                    type="button"
                    className="w-min"
                    variant="backDrawer"
                    icon={{ icon: IconX }}
                    onClick={() =>
                      !disableAll && setValue && setValue('source', undefined)
                    }
                    disabled={disableAll} // Disabled berdasarkan disableAll
                  />
                ) : (
                  <Button
                    type="button"
                    className="w-min"
                    variant="backDrawer"
                    icon={{ icon: IconSearch }}
                    onClick={handleShowSource}
                    disabled={disableAll} // Disabled berdasarkan disableAll
                  />
                );
              }
              return null;
            })()}
          </div>
        </div>
        <InputField
          {...register('item_name')}
          message={
            errors?.item_name
              ? { text: errors.item_name.message!, type: 'danger' }
              : undefined
          }
          label="Item Name"
          placeholder="Text here.."
          type="text"
          required
          right
          disabled={disableAll} // Disabled berdasarkan disableAll
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('local_code')}
          message={
            errors?.local_code
              ? { text: errors.local_code.message!, type: 'danger' }
              : undefined
          }
          label="Item Local Code"
          placeholder="Text here.."
          type="text"
          right
          disabled={disableAll} // Disabled berdasarkan disableAll
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div className="flex flex-col gap-[14px] flex-1 h-full justify-between">
        <InputField
          {...register('foreign_name')}
          message={
            errors?.foreign_name
              ? { text: errors.foreign_name.message!, type: 'danger' }
              : undefined
          }
          label="Foreign Name"
          placeholder="Text here.."
          type="text"
          right
          disabled={disableAll} // Disabled berdasarkan disableAll
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('old_code')}
          message={
            errors?.old_code
              ? { text: errors.old_code.message!, type: 'danger' }
              : undefined
          }
          label="Old Code"
          placeholder="Text here.."
          type="text"
          right
          disabled={disableAll} // Disabled berdasarkan disableAll
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
        <InputField
          {...register('item_request')}
          message={
            errors?.item_request
              ? { text: errors.item_request.message!, type: 'danger' }
              : undefined
          }
          label="Item Request#"
          placeholder="Text here.."
          type="text"
          right
          disabled // Selalu disabled
          className="w-full gap-2"
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div className="flex flex-col gap-[14px]">
        <Label font="bold">Item Type</Label>
        <div className="flex flex-col gap-2">
          <Checkbox
            label="Inventory Item"
            checked={watch('inventory_item')}
            onCheckedChange={(val) =>
              setValue && setValue('inventory_item', val)
            }
            disabled={disableAll} // Disabled berdasarkan disableAll
          />
          <Checkbox
            label="Sales Item"
            checked={watch('sales_item')}
            onCheckedChange={(val) => setValue && setValue('sales_item', val)}
            disabled={disableAll} // Disabled berdasarkan disableAll
          />
          <Checkbox
            label="Purchase Item"
            checked={watch('purchase_item')}
            onCheckedChange={(val) =>
              setValue && setValue('purchase_item', val)
            }
            disabled={disableAll} // Disabled berdasarkan disableAll
          />
          <Checkbox
            label="Service Item"
            checked={watch('service_item')}
            onCheckedChange={(val) => setValue && setValue('service_item', val)}
            disabled={disableAll} // Disabled berdasarkan disableAll
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default BasicForm;
