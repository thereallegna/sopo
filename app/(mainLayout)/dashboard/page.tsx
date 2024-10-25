'use client';

import { useUserSession } from '@hooks/useUserSession';
import React from 'react';

const Dashboard = () => {
  const { isLoading, data } = useUserSession();

  return (
    <div>
      <div>Dashboard {isLoading ? 'loading...' : data?.usercode}</div>
    </div>
  );
};

export default Dashboard;
