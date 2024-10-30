import React from 'react';
import { IconAdjustments } from '@tabler/icons-react';
import { Button } from '@components/ui/Button';
import IconComponent from '@components/ui/Icon';

const FilterButton: React.FC = () => (
  <Button variant="secondary" className="w-[75px]">
    <IconComponent icon={IconAdjustments} size="large" className="mr-2" />
    Filter
  </Button>
);

export default FilterButton;
