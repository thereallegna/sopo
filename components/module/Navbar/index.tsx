'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import IconComponent from '@components/ui/Icon';
import { IconNews, IconBell, IconUser } from '@tabler/icons-react';
import { useUserSession } from '@hooks/useUserSession';

const Navbar = () => {
  const { isLoading, data } = useUserSession();
  const [hasNotification] = useState(false);

  return (
    <div className="w-full px-3 py-2 flex justify-between border-b border-neutral-200">
      <div className="hidden md:flex items-center">
        <Image
          src="/images/logo-runsystem.png"
          alt=""
          width={88}
          height={32}
          quality={100}
        />
      </div>
      <div className="flex items-center justify-end w-full">
        <div className="relative flex items-center mr-4">
          <IconComponent icon={IconNews} size="medium" />
          {hasNotification && (
            <div className="absolute -top-1.5 left-2.5 flex items-center justify-center">
              <div className="w-[10px] h-[10px] bg-red-50 rounded-full flex ites-center justify-center">
                <div className="w-[6px] h-[6px] bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full " />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="relative flex items-center mr-4">
          <IconComponent icon={IconBell} size="medium" />
          {hasNotification && (
            <div className="absolute -top-1.5 left-2 flex items-center justify-center">
              <div className="w-[10px] h-[10px] bg-red-50 rounded-full flex items-center justify-center">
                <div className="w-[6px] h-[6px] bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full " />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col mr-2">
          <span className="text-base font-semibold">
            Hello, {isLoading ? 'loading...' : data?.usercode || 'Guest'}
          </span>
        </div>
        <div className="rounded-full bg-gray-200 p-2 w-7 h-7 flex items-center justify-center">
          <IconComponent icon={IconUser} size="medium" color="primary" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
