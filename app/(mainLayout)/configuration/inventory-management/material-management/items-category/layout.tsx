import React from 'react';
import { Metadata } from 'next';

type Props = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Items Category - RUN System R1',
  description: 'Items Category page',
};

// ?======================================================//
const ItemsCategoryLayout = ({ children }: Props) => <>{children}</>;

export default ItemsCategoryLayout;
