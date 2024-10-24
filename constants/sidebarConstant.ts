import {
  IconLayoutDashboard,
  IconAdjustments,
  IconArrowsLeftRight,
  IconChartArea,
} from '@tabler/icons-react';
import { SidebarItem } from '../types/sidebar';

export const sidebarConstant: SidebarItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: { icon: IconLayoutDashboard },
  },
  {
    title: 'Configuration',
    icon: { icon: IconAdjustments },
    children: [
      {
        title: 'General',
        children: [
          {
            title: 'Document Approval',
            path: '/configuration/general/document-approval',
          },
          {
            title: 'Country',
            path: '/configuration/general/country',
          },
          {
            title: 'Province',
            path: '/configuration/general/province',
          },
          {
            title: 'City',
            path: '/configuration/general/city',
          },
          {
            title: 'Sub District',
            path: '/configuration/general/sub-district',
          },
          {
            title: 'Village',
            path: '/configuration/general/village',
          },
          {
            title: 'Activity Category',
            path: '/configuration/general/activity-category',
          },
          {
            title: 'Activity',
            path: '/configuration/general/activity',
          },
          {
            title: 'Transport Type',
            path: '/configuration/general/transport-type',
          },
          {
            title: 'Vendor Update Approval',
            path: '/configuration/general/vendor-update-approval',
          },
        ],
      },
      {
        title: 'Financial Management',
      },
      {
        title: 'Accounting Management',
      },
      {
        title: 'Procurement\nManagement',
      },
      {
        title: 'Inventory & Material Management',
      },
      {
        title: 'Sales & Distribution',
      },
    ],
  },
  {
    title: 'Transaction',
    icon: { icon: IconArrowsLeftRight },
  },
  {
    title: 'Reporting',
    icon: { icon: IconChartArea },
  },
];
