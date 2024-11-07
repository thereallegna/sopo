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
import { useRouter, useSearchParams } from 'next/navigation';

import { resetPasswordConstant } from '@constants/resetPasswordConstant';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const searchParams = useSearchParams();
  const resetToken = searchParams.get('token');

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Password do not match.');
      return;
    }
    setError('');
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, token: resetToken }),
      });

      if (response.ok) {
        setSuccess(true);
        router.push('/login');
      } else {
        const result = await response.json();
        setError(result.error || 'Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again');
    }
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
          Reset Password
        </CardTitle>
        <CardDescription className="text-[11px] font-normal mt-1">
          Enter a new password below to change your password
        </CardDescription>
        <CardContent className="mt-[10px]">
          {resetPasswordConstant.inputFields.map((inputField, index) => (
            <InputField
              key={inputField.label}
              label={inputField.label}
              placeholder={inputField.placeholder}
              start_icon={inputField.start_icon}
              type={inputField.type}
              value={index === 0 ? newPassword : confirmPassword}
              onChange={(e) => {
                if (inputField.label === 'New Password') {
                  setNewPassword(e.target.value);
                } else {
                  setConfirmPassword(e.target.value);
                }
              }}
              className={index === 1 ? 'mt-[10px]' : ''}
            />
          ))}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mt-2">
              Password reset successfully. Redirecting...
            </p>
          )}
        </CardContent>
        <CardFooter className="mt-[10px]">
          <Button
            type="submit"
            className="w-full h-6"
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
