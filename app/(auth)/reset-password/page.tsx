'use client';

import React, { useState } from 'react';
import InputField from '@components/shared/InputField';
import { Button } from '@components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/Card';
import Image from 'next/image';
import { IconArrowLeft } from '@tabler/icons-react';
import IconComponent from '@components/ui/Icon';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <div className="flex justify-center items-center">
      <Card size="password">
        <CardHeader className="items-center">
          <Image
            src="/images/logo-runsystem.png"
            alt="Run System Logo"
            className="max-w-[93px] p-0 m-0"
            width={93}
            height={32}
            layout="responsive"
            quality={100}
          />
        </CardHeader>
        <CardTitle className="flex items-center text-lg font-bold mt-5">
          <IconComponent
            icon={IconArrowLeft}
            className="mr-2"
            onClick={() => router.push('/forgot-password')}
          />
          Reset Password
        </CardTitle>
        <CardDescription className="text-[11px] font-normal mt-1">
          Enter a new password below to change your password
        </CardDescription>
        <CardContent className="mt-5">
          <InputField
            placeholder="Input your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            className="mt-[10px]"
            placeholder="Confirm your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </CardContent>
        <CardFooter className="mt-[10px]">
          <Button type="submit" className="w-full h-6">
            Reset Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
