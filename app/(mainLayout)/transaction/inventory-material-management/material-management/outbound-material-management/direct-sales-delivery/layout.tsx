import React from 'react';
import { Metadata } from 'next';

type Props = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Direct Sales Delivery - RUN System R1',
  description: 'Direct Sales Delivery page',
};

// ?======================================================//
const DirectSalesDeliveryLayout = ({ children }: Props) => <>{children}</>;

export default DirectSalesDeliveryLayout;
