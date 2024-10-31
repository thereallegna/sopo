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
import { Checkbox } from '@components/ui/Checkbox';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '@constants/schemas/LoginSchema';
import { useMutation } from '@tanstack/react-query';
import { login } from '@services/fetcher/auth/login';
import { useRouter } from 'next/navigation';
import { authConstant } from '@constants/authConstant';
import Link from 'next/link';

const LoginPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<LoginFormBody>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();

  React.useEffect(() => {
    const savedUsercode = localStorage.getItem('usercode');
    if (savedUsercode) {
      setValue('user_code', savedUsercode);
    }
  }, [setValue]);

  const { mutate: mutationLogin } = useMutation({
    mutationFn: login,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      reset();
      router.push('/dashboard');
      setIsLoading(false);
    },
    onError: (error: any) => {
      setIsLoading(false);

      if (error?.response?.data) {
        const { errorField, message } = error.response.data;

        if (errorField === 'usercode') {
          setError('user_code', { type: 'server', message });
        } else if (errorField === 'password') {
          setError('password', { type: 'server', message });
        }
      }
    },
  });

  const handleFormSubmit: SubmitHandler<LoginFormBody> = (data) => {
    if (watch('keepUserId')) {
      localStorage.setItem('usercode', watch('user_code'));
    }
    mutationLogin(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card size="login">
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
        <CardTitle className="text-lg font-bold mt-5">
          Welcome to RUN System
        </CardTitle>
        <CardDescription className="text-[11px] mt-1">
          Enter your credentials to access your account
        </CardDescription>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="mt-5 flex flex-col gap-[10px]">
            <InputField
              {...authConstant.inputField[0]}
              {...register('companyId')}
              message={
                errors.companyId
                  ? { text: errors.companyId.message!, type: 'danger' }
                  : undefined
              }
            />
            <InputField
              {...authConstant.inputField[1]}
              {...register('user_code')}
              message={
                errors.user_code
                  ? { text: errors.user_code.message!, type: 'danger' }
                  : undefined
              }
            />
            <InputField
              {...authConstant.inputField[2]}
              {...register('password')}
              message={
                errors.password
                  ? { text: errors.password.message!, type: 'danger' }
                  : undefined
              }
            />
            <div className="flex justify-between">
              <Checkbox
                {...authConstant.checkbox}
                {...register('keepUserId')}
              />
              <Link
                href="/password"
                className="text-blue-500 font-normal text-[11px] justify-end"
              >
                Forgot Password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
