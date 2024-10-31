import React from 'react';
import { IconAdjustments } from '@tabler/icons-react';
import { Button, ButtonProps } from '@components/ui/Button';

const FilterButton: React.FC<ButtonProps> = (props) => (
  <Button
    variant="secondary"
    className="w-[75px]"
    {...props}
    icon={{
      icon: IconAdjustments,
      size: 'large',
      className: 'mr-2',
      color: 'secondary',
    }}
  >
    Filter
  </Button>
);

export default FilterButton;
