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
import { forgotPasswordConstant } from '@constants/forgotPasswordConstant';
import { forgotPassword } from '@services/fetcher/password/forgot-password';
import { AxiosError } from 'axios';
import { errorMapping } from '@utils/errorMapping';
import { forgotPasswordSchema } from '@constants/schemas/AuthSchema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';

const ForgotPasswordPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordBody>({
    mode: 'onChange',
    resolver: yupResolver(forgotPasswordSchema),
  });

  const { mutate: mutationForgotPassword } = useMutation({
    mutationFn: forgotPassword,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      console.log('Email sent successful');
      setIsModalOpen(true);
      setErrorMessage(null);
    },
    onError: (error: any) => {
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.response?.data) {
        const { errorField, message } = errorRes.response.data;
        errorMapping(errorField, setError);
        setErrorMessage(
          message || 'Something went wrong, please try again later'
        );
      }
    },
  });

  const handleFormSubmit: SubmitHandler<ForgotPasswordBody> = (data) => {
    console.log('Submitting password reset', data);
    mutationForgotPassword(data);
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
          No worries, we will send you reset instructions
        </CardDescription>

        {errorMessage && (
          <div className="text-red-500 text-sm mb-3">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="mt-5">
            <InputField
              {...forgotPasswordConstant.inputField[0]}
              {...register('email')}
              message={
                errors.email
                  ? { text: errors.email.message!, type: 'danger' }
                  : undefined
              }
            />
          </CardContent>
          <CardFooter className="mt-[10px]">
            <Button type="submit" className="w-full h-6" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </CardFooter>
        </form>
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
              Email has been sent. Follow the instructions we sent to your email
              to reset your password.
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
