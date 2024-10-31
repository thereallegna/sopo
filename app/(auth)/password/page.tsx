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
import IconComponent from '@components/ui/Icon';
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSendEmail = () => {
    console.log('Sending Email...');

    const isEmailSent = true;

    if (isEmailSent) {
      setEmailSent(true);
      console.log('Email sent successfully');
    } else {
      setEmailSent(false);
      console.log('Failed to send email');
    }

    setIsModalOpen(true);
  };

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
            onClick={() => router.push('/login')}
          />
          Forgot Password?
        </CardTitle>
        <CardDescription className="text-[11px] font-normal mt-1">
          No worries, we will send you reset instruction
        </CardDescription>
        <CardContent className="mt-5">
          <InputField
            placeholder="Input your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </CardContent>
        <CardFooter className="mt-[10px]">
          <Button type="submit" className="w-full" onClick={handleSendEmail}>
            Send
          </Button>
        </CardFooter>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Card size="modal">
            <div className="border-b border-neutral-200">
              <div className="flex justify-between items-center px-[10px] py-[5px]">
                <h2 className="text-lg font-bold">Reset Password</h2>
                <IconComponent
                  onClick={() => setIsModalOpen(false)}
                  size="large"
                  icon={IconX}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <p className="p-[10px] text-[11px]">
              {emailSent
                ? 'Email has been sent. Follow the instructions we sent to your email to reset your password.'
                : 'Failed to send email. Please try again.'}
            </p>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-[50px] text-[11px] font-semibold"
                onClick={() => setIsModalOpen(false)}
              >
                OK
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
