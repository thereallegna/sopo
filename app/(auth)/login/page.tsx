'use client';

import React from 'react';

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
import {
  IconBuildingSkyscraper,
  IconLock,
  IconUser,
} from '@tabler/icons-react';
import Image from 'next/image';
import { Checkbox } from '@components/ui/Checkbox';

// icon from tabler
// Icon: building-skyscraper

const LoginPage = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Card size="login" variant="default">
      <CardHeader className="items-center">
        <Image
          src="/images/logo-runsystem.png"
          alt="Run System Logo"
          className="max-w-[130px] h-auto"
          width={200}
          height={200}
          layout="responsive"
          quality={100}
        />
      </CardHeader>
      <CardTitle className="text-[20px]">Welcome to RUN System</CardTitle>
      <CardDescription className="text-[12px]">
        Enter your credentials to access your account
      </CardDescription>
      <CardContent className="mt-5 flex flex-col gap-[10px]">
        <InputField
          label="Company ID"
          placeholder="Input your company ID"
          start_icon={IconBuildingSkyscraper}
        />
        <InputField
          label="Usercode"
          placeholder="Input your usercode"
          start_icon={IconUser}
        />
        <InputField
          label="Password"
          type="password"
          start_icon={IconLock}
          placeholder="Input your password"
        />
        <Checkbox label="Keep User ID" />
      </CardContent>
      <CardFooter className="mt-5">
        <Button>Login</Button>
      </CardFooter>
    </Card>
  </div>
);

export default LoginPage;
