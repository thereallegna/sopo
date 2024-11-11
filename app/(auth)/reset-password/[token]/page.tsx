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
import Image from 'next/image';
import { IconArrowLeft } from '@tabler/icons-react';
import IconComponent from '@components/ui/Icon';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@services/fetcher/password/reset-password';
import { resetPasswordConstant } from '@constants/resetPasswordConstant';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import resetPasswordSchema from '@constants/schemas/ResetPasswordSchema';
import { useMutation } from '@tanstack/react-query';

const ResetPasswordPage = ({ params }: { params: { token: string } }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
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
      reset();
      router.push('/login');
      setIsLoading(false);
    },
    onError: (error: any) => {
      setIsLoading(false);

      if (error?.response?.data) {
        const { errorField } = error.response.data;

        if (errorField.new_password) {
          setError('new_password', {
            type: 'server',
            message: errorField.new_password,
          });
        } else if (errorField.confirm_password) {
          setError('confirm_password', {
            type: 'server',
            message: errorField.confirm_password,
          });
        }
      }
    },
  });

  const handleFormSubmit: SubmitHandler<ResetPasswordBody> = (data) => {
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
            onClick={() => router.push('/login')}
          />
          Reset Password
        </CardTitle>
        <CardDescription className="text-[11px] font-normal mt-1">
          Enter a new password below to change your password
        </CardDescription>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="mt-[10px] flex flex-col gap-y-[10px]">
            {/* {resetPasswordConstant.inputFields.map((inputField, index) => (
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
            ))} */}
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
            {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm mt-2">
                Password reset successfully. Redirecting...
              </p>
            )} */}
          </CardContent>
          <CardFooter className="mt-[10px]">
            <Button type="submit" className="w-full h-6" disabled={isLoading}>
              Reset Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
