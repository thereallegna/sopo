import { useCallback } from 'react';

export type UseFormSaveProps = {
  ref: React.RefObject<HTMLFormElement>;
  isLoading: boolean;
  hasChanged: boolean;
};

export const useFormSave = ({
  ref,
  isLoading,
  hasChanged,
}: UseFormSaveProps) => {
  const handleSaveClick = () => {
    console.log('Save button clicked');
    ref.current?.requestSubmit();
  };

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (!isLoading && hasChanged) {
          ref.current?.requestSubmit();
        }
      }
    },
    [isLoading, hasChanged, ref]
  );

  return {
    handleSaveClick,
    handleInputKeyDown,
  };
};
