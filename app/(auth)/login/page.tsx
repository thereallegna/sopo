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

// icon from tabler
// Icon: building-skyscraper

const LoginPage = () => (
  <div className="flex  justify-center items-center min-h-screen p-32 gap-[16px]">
    <Card size="default" variant="default">
      <CardHeader />
      <CardTitle title="Welcome to RUN System" />
      <CardDescription description="Enter your credentials to access your account" />
      <CardContent>
        <InputField
          label="Company ID"
          placeholder="Input your company ID"
          start_icon={IconBuildingSkyscraper}
        />
        <InputField
          label="Usercode"
          placeholder="Input your usercode'"
          start_icon={IconUser}
        />
        <InputField
          label="Password"
          type="password"
          start_icon={IconLock}
          placeholder="Input your password"
        />
      </CardContent>
      <CardFooter>
        <Button
          variant="outlined"
          size="normal"
          icon={IconBuildingSkyscraper}
          iconSize="large"
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  </div>
);

export default LoginPage;
