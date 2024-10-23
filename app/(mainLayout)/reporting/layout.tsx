import React from 'react';
import { Metadata } from 'next';

type Props = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Reporting - RUN System R1',
  description: 'Reporting page.',
};

// ?======================================================//
const ReportingLayout = ({ children }: Props) => <>{children}</>;

export default ReportingLayout;
