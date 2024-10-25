'use client';

import React from 'react';
import IconComponent from '@components/ui/Icon';
import { IconArrowUpRight } from '@tabler/icons-react';
import Link from 'next/link';

export interface ToDetailProps {
  href: string;
}

const ToDetail = ({ href }: ToDetailProps) => (
  <Link href={href}>
    <IconComponent icon={IconArrowUpRight} color="secondary" />
  </Link>
);

export default ToDetail;
