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
const ReportingLayout = ({ children }: Props) => (
  <>
    <main className="lg:pb-14 pb-10 box-border relative w-full">
      {children}
    </main>
  </>
);

export default ReportingLayout;
