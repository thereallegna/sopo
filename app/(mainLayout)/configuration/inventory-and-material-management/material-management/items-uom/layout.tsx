import React from 'react';
import { Metadata } from 'next';

type Props = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Items UOM - RUN System R1',
  description: 'Items UOM page.',
};

// ?======================================================//
const ItemsUomLayout = ({ children }: Props) => <>{children}</>;

export default ItemsUomLayout;
