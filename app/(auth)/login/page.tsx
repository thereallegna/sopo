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
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '@constants/schemas/LoginSchema';
import { useMutation } from '@tanstack/react-query';
import { login } from '@services/fetcher/auth/login';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [isLoading, setIsLoading] = React.useState(false); // Loading state

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<LoginFormBody>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();

  // make mutation here
  const { mutate: mutationLogin } = useMutation({
    mutationFn: login,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      console.log('Login success', data);
      router.push('/dashboard');
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleFormSubmit: SubmitHandler<LoginFormBody> = (data) => {
    console.log('Form Submitted');
    mutationLogin(data);
    reset();
  };

  console.log(watch('usercode'), watch('password'), watch('companyId'));
  return (
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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <CardContent className="mt-5 flex flex-col gap-[10px]">
            <InputField
              label="Company ID"
              placeholder="Input your company ID"
              start_icon={IconBuildingSkyscraper}
              {...register('companyId')}
              message={
                errors.companyId
                  ? { text: errors.companyId.message!, type: 'danger' }
                  : undefined
              }
            />
            <InputField
              label="Usercode"
              placeholder="Input your usercode"
              start_icon={IconUser}
              {...register('usercode')}
              message={
                errors.usercode
                  ? { text: errors.usercode.message!, type: 'danger' }
                  : undefined
              }
            />

            <InputField
              label="Password"
              type="password"
              start_icon={IconLock}
              placeholder="Input your password"
              {...register('password')}
              message={
                errors.password
                  ? { text: errors.password.message!, type: 'danger' }
                  : undefined
              }
            />

            <Checkbox label="Keep User ID" {...register('keepUserId')} />
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
