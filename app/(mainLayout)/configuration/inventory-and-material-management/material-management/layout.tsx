import React from 'react';
import { Metadata } from 'next';

type Props = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Material Management - RUN System R1',
  description: 'Material Management page.',
};

// ?======================================================//
const MaterialManagemenLayout = ({ children }: Props) => <>{children}</>;

export default MaterialManagemenLayout;
