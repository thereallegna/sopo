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
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import IconComponent from '@components/ui/Icon';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@services/fetcher/password/reset-password';
import { resetPasswordConstant } from '@constants/resetPasswordConstant';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '@constants/schemas/AuthSchema';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { errorMapping } from '@utils/errorMapping';

const ResetPasswordPage = ({ params }: { params: { token: string } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordBody>({
    mode: 'onChange',
    resolver: yupResolver(resetPasswordSchema),
  });

  const { mutate: mutationLogin } = useMutation({
    mutationFn: resetPassword,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      console.log('Password reset successful');
      setIsModalOpen(true);
    },
    onError: (error: any) => {
      setIsLoading(false);
      const errorRes = error as AxiosError<ErrorResponse>;
      if (errorRes.response?.data) {
        const { errorField, message } = errorRes.response.data;
        console.log(errorRes.response.data);
        if (message === 'Invalid token') {
          setIsErrorModalOpen(true);
        } else {
          errorMapping(errorField, setError);
        }
      }
    },
  });

  const handleFormSubmit: SubmitHandler<ResetPasswordBody> = (data) => {
    console.log('Submitting password reset', data);
    mutationLogin({ token: params.token, ...data });
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
            onClick={() => router.push('/forgot-password')}
          />
          Reset Password
        </CardTitle>
        <CardDescription className="text-[11px] font-normal mt-1">
          Enter a new password below to change your password
        </CardDescription>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="mt-[10px] flex flex-col gap-y-[10px]">
            <InputField
              {...resetPasswordConstant.inputFields[0]}
              {...register('new_password')}
              message={
                errors.new_password
                  ? { text: errors.new_password.message!, type: 'danger' }
                  : undefined
              }
            />
            <InputField
              {...resetPasswordConstant.inputFields[1]}
              {...register('confirm_password')}
              message={
                errors.confirm_password
                  ? { text: errors.confirm_password.message!, type: 'danger' }
                  : undefined
              }
            />
          </CardContent>
          <CardFooter className="mt-[10px]">
            <Button type="submit" className="w-full h-6" disabled={isLoading}>
              Reset Password
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Card size="modal">
            <div className="border-b border-neutral-200">
              <div className="flex justify-between items-center px-[10px] py-[5px]">
                <h2 className="text-lg font-bold">Password Reset Successful</h2>
                <IconComponent
                  onClick={() => setIsModalOpen(false)}
                  size="large"
                  icon={IconX}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <p className="p-[10px] text-[11px]">
              Your password has been successfully reset. You can now log in with
              your new password.
            </p>
            <div className="flex justify-end">
              <Button
                type="button"
                className="w-[50px] text-[11px] font-semibold"
                onClick={() => {
                  setIsModalOpen(false);
                  router.push('/login');
                }}
              >
                OK
              </Button>
            </div>
          </Card>
        </div>
      )}

      {isErrorModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Card size="modal">
            <div className="border-b border-neutral-200">
              <div className="flex justify-between items-center px-[10px] py-[5px]">
                <h2 className="text-lg font-bold">Token Invalid</h2>
                <IconComponent
                  onClick={() => setIsErrorModalOpen(false)}
                  size="large"
                  icon={IconX}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <p className="p-[10px] text-[11px]">
              The token used is invalid. Please request a new password reset
              link.
            </p>
            <div className="flex justify-end">
              <Button
                type="button"
                className="w-[50px] text-[11px] font-semibold"
                onClick={() => setIsErrorModalOpen(false)}
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

export default ResetPasswordPage;
