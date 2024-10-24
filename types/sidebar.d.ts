import { IconProps } from '@components/ui/Icon';

type SidebarItem = {
  title: string;
  path?: string;
  icon?: IconProps;
  children?: SidebarItem[];
};
