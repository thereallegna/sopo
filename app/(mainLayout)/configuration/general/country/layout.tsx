import React from 'react';
import { Metadata } from 'next';

type Props = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Country - RUN System R1',
  description: 'Country page.',
};

// ?======================================================//
const CountryLayout = ({ children }: Props) => <>{children}</>;

export default CountryLayout;
