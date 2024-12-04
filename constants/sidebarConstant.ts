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
        children: [
          {
            title: 'Currency',
            path: '/configuration/financial-management/currency',
          },
          {
            title: 'Currency Rate',
            path: '/configuration/financial-management/currency-rate',
          },
          {
            title: 'Term of Payment',
            path: '/configuration/financial-management/term-of-payment',
          },
          {
            title: 'Tax',
            path: '/configuration/financial-management/tax',
          },
          {
            title: 'Closing Balance in Cash/Bank Account',
            path: '/configuration/financial-management/closing-balance-in-cash',
          },
          {
            title: 'Tax Group',
            path: '/configuration/financial-management/tax-group',
          },
          {
            title: 'Bank',
            path: '/configuration/financial-management/bank',
          },
          {
            title: 'Cash & Bank Account',
            path: '/configuration/financial-management/cash-and-bank-account',
          },
        ],
      },
      {
        title: 'Accounting Management',
        children: [
          {
            title: 'Account Category',
            path: '/configuration/accounting-management/account-category',
          },
          {
            title: 'Chart of Account',
            path: '/configuration/accounting-management/chart-of-account',
          },
          {
            title: 'Closing & Opening Balance',
            path: '/configuration/accounting-management/closing-and-opening-balance',
          },
          {
            title: 'Closing Journal Entries',
            path: '/configuration/accounting-management/closing-journal-entries',
          },
        ],
      },
      {
        title: 'Procurement Management',
        children: [
          {
            title: 'Vendor Category',
            path: '/configuration/procurement-management/vendor-category',
          },
          {
            title: 'Master Vendor',
            path: '/configuration/procurement-management/master-vendor',
          },
          {
            title: "Vendor's Sector",
            path: "/configuration/procurement-management/vendor's-sector",
          },
          {
            title: "Vendor's Rating",
            path: "/configuration/procurement-management/vendor's-rating",
          },
          {
            title: "Vendor's Qualification",
            path: "/configuration/procurement-management/vendor's-qualification",
          },
        ],
      },
      {
        title: 'Inventory & Material Management',
        children: [
          {
            title: 'Material Management',
            children: [
              {
                title: 'Items Category',
                path: '/configuration/inventory-and-material-management/material-management/items-category',
              },
              {
                title: 'Master Items',
                path: '/configuration/inventory-and-material-management/material-management/master-items',
              },
              {
                title: 'Items UoM',
                path: '/configuration/inventory-and-material-management/material-management/items-uom',
              },
            ],
          },
          {
            title: 'Warehouse Management System',
            children: [
              {
                title: "Warehouse's Category",
                path: '/configuration/inventory-and-material-management/material-management/warehouse-category',
              },
              {
                title: 'Warehouse',
                path: '/configuration/inventory-and-material-management/material-management/warehouse',
              },
            ],
          },
        ],
      },
      {
        title: 'Sales & Distribution',
        children: [
          {
            title: 'Sales Management',
            path: '/configuration/sales-and-distribution/sales-management',
          },
          {
            title: 'Distribution Management',
            path: '/configuration/sales-and-distribution/distribution-management',
          },
        ],
      },
    ],
  },
  {
    title: 'Transaction',
    icon: { icon: IconArrowsLeftRight },
    children: [
      {
        title: 'Financial Management',
        children: [
          {
            title: 'Account Receivable - AR',
            children: [
              {
                title: 'Sales Invoice',
                path: 'transaction/financial-management/account-receivable-ar/sales-invoice',
              },
              {
                title: 'Sales Return Invoice',
                path: 'transaction/financial-management/account-receivable-ar/sales-return-invoice',
              },
              {
                title: 'Incoming Payment',
                path: 'transaction/financial-management/account-receivable-ar/incoming-payment',
              },
              {
                title: "Customer's AR Downpayment",
                path: 'transaction/financial-management/account-receivable-ar/customer-ar-downpayment',
              },
              {
                title: 'Customer Deposit (Currency Switching)',
                path: 'transaction/financial-management/account-receivable-ar/customer-deposit',
              },
              {
                title: 'AR Settlement',
                path: 'transaction/financial-management/account-receivable-ar/ar-settlement',
              },
              {
                title: 'Customer Deposit Return',
                path: 'transaction/financial-management/account-receivable-ar/customer-deposit-return',
              },
            ],
          },
          {
            title: 'Account Payable - AR',
            children: [
              {
                title: 'Purchase Invoice',
                path: 'transaction/financial-management/account-payable-ar/purchase-invoice',
              },
              {
                title: "Vendor's AP Downpayment",
                path: 'transaction/financial-management/account-payable-ar/vendor-ap-downpayment',
              },
              {
                title: 'Outgoing Payment',
                path: 'transaction/financial-management/account-payable-ar/outgoing payment',
              },
              {
                title: 'Purchase Return Invoice',
                path: 'transaction/financial-management/account-payable-ar/purchase-return-invoice',
              },
              {
                title: 'Purchase Receipt',
                path: 'transaction/financial-management/account-payable-ar/purchase-receipt',
              },
              {
                title: 'AR Settlement',
                path: 'transaction/financial-management/account-payable-ar/ar-settlement',
              },
              {
                title: 'Vendor Deposit (Currency Switching)',
                path: 'transaction/financial-management/account-payable-ar/vendor-deposit',
              },
              {
                title: 'Vendor Deposit Return',
                path: 'transaction/financial-management/account-payable-ar/vendor-deposit-return',
              },
            ],
          },
          {
            title: 'Cash Flow Management',
            children: [
              {
                title: 'Cash Advance Settlement',
                path: 'transaction/financial-management/cash-flow-management/cash-advance-settlement',
              },
              {
                title: 'Voucher Request',
                path: 'transaction/financial-management/cash-flow-management/voucher-request',
              },
              {
                title: 'Voucher',
                path: 'transaction/financial-management/cash-flow-management/voucher',
              },
            ],
          },
        ],
      },
      {
        title: 'Accounting Management',
        children: [
          {
            title: 'Journal Transaction',
            path: '/transaction/accounting-management/journal-transaction',
          },
          {
            title: 'Journal Voucher',
            path: '/transaction/accounting-management/journal-voucher',
          },
          {
            title: 'Monthly Foreign Exchange Journal',
            path: '/transaction/accounting-management/monthly-foreign-exchange-journal',
          },
          {
            title: 'Journal Reprocess',
            path: '/transaction/accounting-management/journal-reprocess',
          },
        ],
      },
      {
        title: 'Purchasing Management',
        children: [
          {
            title: 'Vendor Management System',
            children: [
              {
                title: 'Vendor Quotation',
                path: '/transaction/purchasing-management/vendor-management-system/vendor-quotation',
              },
            ],
          },
          {
            title: 'Purchasing',
            children: [
              {
                title: 'Material Request',
                path: '/transaction/purchasing-management/purchasing/material-request',
              },
              {
                title: 'Purchase Order Request',
                path: '/transaction/purchasing-management/purchasing/purchase-order-request',
              },
              {
                title: 'Purchase Order',
                path: '/transaction/purchasing-management/purchasing/purchase-order',
              },
            ],
          },
        ],
      },
      {
        title: 'Inventory Material Management',
        children: [
          {
            title: 'Inventory Management',
            children: [
              {
                title: 'Initial Stock',
                path: '/transaction/inventory-material-management/inventory-management/initial-stock',
              },
              {
                title: 'Stock Adjustment',
                path: '/transaction/inventory-material-management/inventory-management/stock-adjustment',
              },
              {
                title: 'Stock Mutation',
                path: '/transaction/inventory-material-management/inventory-management/stock-mutation',
              },
            ],
          },
          {
            title: 'Material Management',
            children: [
              {
                title: 'Internal Material Management',
                children: [
                  {
                    title: 'Material Consumption',
                    path: '/transaction/inventory-material-management/material-management/internal-material-management/material-consumption',
                  },
                  {
                    title: 'Material Transfer',
                    path: '/transaction/inventory-material-management/material-management/internal-material-management/material-transfer',
                  },
                  {
                    title: 'Material Receive',
                    path: '/transaction/inventory-material-management/material-management/internal-material-management/material-receive',
                  },
                  {
                    title: 'Direct Material Receive',
                    path: '/transaction/inventory-material-management/material-management/internal-material-management/direct-material-receive',
                  },
                ],
              },
              {
                title: 'Inbound Material Management',
                children: [
                  {
                    title: 'Purchased Material Receive',
                    path: '/transaction/inventory-material-management/material-management/inbound-material-management/purchased-material-receive',
                  },
                  {
                    title: 'Sales Return Material Receive',
                    path: '/transaction/inventory-material-management/material-management/inbound-material-management/sales-return-material-receive',
                  },
                  {
                    title: 'Direct Purchase Receive',
                    path: '/transaction/inventory-material-management/material-management/inbound-material-management/direct-purchase-receive',
                  },
                ],
              },
              {
                title: 'Outbound Material Management',
                children: [
                  {
                    title: 'Sales Return Delivery',
                    path: '/transaction/inventory-material-management/material-management/outbound-material-management/sales-return-delivery',
                  },
                  {
                    title: 'Purchase Return Delivery',
                    path: '/transaction/inventory-material-management/material-management/outbound-material-management/purchase-return-delivery',
                  },
                  {
                    title: 'Sales Delivery',
                    path: '/transaction/inventory-material-management/material-management/outbound-material-management/sales-delivery',
                  },
                  {
                    title: 'Direct Sales Delivery',
                    path: '/transaction/inventory-material-management/material-management/outbound-material-management/direct-sales-delivery',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Sales Distribution',
        children: [
          {
            title: "Customer's Quotation",
            path: '/transaction/sales-distribution/customer-quotation',
          },
          {
            title: 'Sales Order',
            path: '/transaction/sales-distribution/sales-order',
          },
          {
            title: 'Delivery Request',
            path: '/transaction/sales-distribution/delivery-request',
          },
          {
            title: 'Service Delivery',
            path: '/transaction/sales-distribution/service-delivery',
          },
        ],
      },
    ],
  },
  {
    title: 'Reporting',
    icon: { icon: IconChartArea },
    children: [
      {
        title: 'Financial Management',
        children: [
          {
            title: 'Outstanding Voucher Request',
            path: '/reporting/financial-management/outstanding-voucher-request',
          },
          {
            title: 'Cash Flow',
            path: '/reporting/financial-management/cash-flow',
          },
          {
            title: 'Giro Movement',
            path: '/reporting/financial-management/giro-movement',
          },
          {
            title: 'Giro Summary',
            path: '/reporting/financial-management/giro-summary',
          },
          {
            title: 'Finance Performance',
            path: '/reporting/financial-management/finance-performance',
          },
          {
            title: 'Cash Book',
            path: '/reporting/financial-management/cash-book',
          },
          {
            title: 'Account Payable',
            children: [
              {
                title: 'AP Aging - Uninvoiced',
                path: '/reporting/financial-management/account-payable/ap-going-uninvoiced',
              },
              {
                title: 'AP Aging - Invoiced',
                path: '/reporting/financial-management/account-payable/ap-going-invoiced',
              },
              {
                title: 'Vendor Deposit Movement',
                path: '/reporting/financial-management/account-payable/vendor-deposit-movement',
              },
              {
                title: 'Vendor Deposit Summary',
                path: '/reporting/financial-management/account-payable/vendor-deposit-summary',
              },
              {
                title: 'Outgoing Payment',
                path: '/reporting/financial-management/account-payable/outgoing-payment',
              },
              {
                title: 'Outoging Payment Tracker',
                path: '/reporting/financial-management/account-payable/outgoing-payment-tracker',
              },
              {
                title: 'Purchase Additional Cost',
                path: '/reporting/financial-management/account-payable/purchase-additional-cost',
              },

              {
                title: 'AP Subledger',
                path: '/reporting/financial-management/account-payable/ap-subledger',
              },
            ],
          },
          {
            title: 'Account Receivable',
            children: [
              {
                title: 'AR Aging - Uninvoiced',
                path: '/reporting/financial-management/account-receivable/ar-aging-uninvoiced',
              },
              {
                title: 'AR Aging - Invoiced',
                path: '/reporting/financial-management/account-receivable/ar-aging-invoiced',
              },
              {
                title: 'Customer Deposit Movement',
                path: '/reporting/financial-management/account-receivable/customer-deposit-movement',
              },
              {
                title: 'Customer AR Deposit Summary',
                path: '/reporting/financial-management/account-receivable/customer-ar-deposit-summary',
              },
              {
                title: 'AR Subledger',
                path: '/reporting/financial-management/account-receivable/ar-subledger',
              },
            ],
          },
        ],
      },
      {
        title: 'Accounting Management',
        children: [
          {
            title: 'General Ledger',
            path: '/reporting/accounting-management/general-ledger',
          },
          {
            title: 'Trial Balance',
            path: '/reporting/accounting-management/trial-balance',
          },
          {
            title: 'Profit/Loss',
            path: '/reporting/accounting-management/profit-or-loss',
          },
          {
            title: 'Balance Sheet',
            path: '/reporting/accounting-management/balance-sheet',
          },
          {
            title: 'Print Out',
            children: [
              {
                title: 'Print Out General Ledger',
                path: '/reporting/accounting-management/print-out/print-out-general-ledger',
              },
              {
                title: 'Print Out Profit/Loss',
                path: '/reporting/accounting-management/print-out/print-out-profit-or-loss',
              },
              {
                title: 'Print Out Balance Sheet',
                path: '/reporting/accounting-management/print-out/print-out-balance-sheet',
              },
            ],
          },
          {
            title: 'Journal Reprocess History',
            path: '/reporting/accounting-management/journal-reprocess-history',
          },
        ],
      },
      {
        title: 'Purchasing Management',
        children: [
          {
            title: 'Vendor Quotation List',
            path: '/reporting/purchasing-management/vendor-quotation-list',
          },
          {
            title: 'PO List Basic',
            path: '/reporting/purchasing-management/po-list-basic',
          },
          {
            title: 'Outstanding Material Request',
            path: '/reporting/purchasing-management/outstanding-material-request',
          },
          {
            title: 'Outstanding Purchase Order List',
            path: '/reporting/purchasing-management/outstanding-purchase-order-list',
          },
          {
            title: 'PO List Advance',
            path: '/reporting/purchasing-management/po-list-advance',
          },
          {
            title: 'PO Request Process',
            path: '/reporting/purchasing-management/po-request-process',
          },
          {
            title: 'Purchasing Status',
            path: '/reporting/purchasing-management/purchasing-status',
          },
          {
            title: 'Purchase Service Level By Vendor',
            path: '/reporting/purchasing-management/purchase-service-level-by-vendor',
          },
          {
            title: 'Purchase Service Level',
            path: '/reporting/purchasing-management/purchase-service-level',
          },
          {
            title: 'Order Report by Vendor',
            path: '/reporting/purchasing-management/order-report-by-vendor',
          },
          {
            title: 'Order Report by Item',
            path: '/reporting/purchasing-management/order-report-by-item',
          },
          {
            title: 'Order & Received Comparison',
            path: '/reporting/purchasing-management/order-and-received-comparison',
          },
          {
            title: "Purchaser's Performance",
            path: "/reporting/purchasing-management/purchaser's-performance",
          },
          {
            title: 'Procure to Pay',
            path: '/reporting/purchasing-management/procure-to-pay',
          },
          {
            title: 'Procurement Performance',
            path: '/reporting/purchasing-management/procurement-performance',
          },
        ],
      },
      {
        title: 'Inventory Material Management',
        children: [
          {
            title: 'Inventory Management',
            children: [
              {
                title: 'Stock Summary',
                path: '/reporting/inventory-material-management/inventory-management/stock=-summary',
              },
              {
                title: 'Stock Movement',
                path: '/reporting/inventory-material-management/inventory-management/stock-movement',
              },
              {
                title: "Item's Stock Summary",
                path: "/reporting/inventory-material-management/inventory-management/item's-stock-summary",
              },
              {
                title: 'Daily Stock Movement',
                path: '/reporting/inventory-material-management/inventory-management/daily-stock-movement',
              },
              {
                title: 'Stock Value',
                path: '/reporting/inventory-material-management/inventory-management/stock-value',
              },
              {
                title: 'History of Stock',
                path: '/reporting/inventory-material-management/inventory-management/history-of-stock',
              },
            ],
          },
          {
            title: 'Material Management',
            children: [
              {
                title: 'Logistic Performance',
                path: '/reporting/inventory-material-maangement/material-management/logistic-performance',
              },
              {
                title: 'Transfer Item Between Warehouses',
                path: '/reporting/inventory-material-maangement/material-management/transfer-item-between-warehouses',
              },
              {
                title: 'Purchased Material Receive',
                path: '/reporting/inventory-material-maangement/material-management/purchased-material-receive',
              },
            ],
          },
        ],
      },
      {
        title: 'Sales Management',
        children: [
          {
            title: 'Sales Volume',
            path: '/reporting/sales-management/sales-volume',
          },
          {
            title: 'Sales Area Report',
            path: '/reporting/sales-management/sales-area-report',
          },
          {
            title: 'Outstanding Sales Order Value',
            path: '/reporting/sales-management/outstanding-sales-order-value',
          },
          {
            title: 'Outstanding Sales Order Volume',
            path: '/reporting/sales-management/outstanding-sales-order-volume',
          },
          {
            title: 'Reorder Customer',
            path: '/reporting/sales-management/reorder-customer',
          },
          {
            title: 'Sales Order to Delivery Report',
            path: '/reporting/sales-management/sales-order-to-delivery-report',
          },
          {
            title: 'Sales Performance',
            path: '/reporting/sales-management/sales-performance',
          },
          {
            title: "Sales Person's Collection",
            path: "/reporting/sales-management/sales-person's-collection",
          },
          {
            title: "Sales Person's Omset",
            path: "/reporting/sales-management/sales-person's-omset",
          },
          {
            title: "Sales Person's Performance",
            path: "/reporting/sales-management/sales-person's-performance",
          },
          {
            title: 'Sales Target',
            path: '/reporting/sales-management/sales-target',
          },
          {
            title: 'Sales to Paid',
            path: '/reporting/sales-management/sales-to-paid',
          },
          {
            title: "Sales's Item Stock",
            path: "/reporting/sales-management/sales's-item-stock",
          },
        ],
      },
    ],
  },
];
