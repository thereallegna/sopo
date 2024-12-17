import React from 'react';
import { Metadata } from 'next';

type Props = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Stock Adjustment - RUN System R1',
  description: 'Stock Adjustment page',
};

// ?======================================================//
const StockAdjustmentLayout = ({ children }: Props) => <>{children}</>;

export default StockAdjustmentLayout;
