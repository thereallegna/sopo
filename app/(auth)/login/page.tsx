"use client";

import React from "react";
import InputField from "@components/shared/InputField";
import { Button } from "@components/ui/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/Card";
import Image from "next/image";
import { Checkbox } from "@components/ui/Checkbox";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@constants/schemas/AuthSchema";
import { useMutation } from "@tanstack/react-query";
import { login } from "@services/fetcher/auth/login";
import { useRouter } from "next/navigation";
import { authConstant } from "@constants/authConstant";
import Link from "next/link";

const LoginPage = () => {
    console.log("Komponen LoginPage dirender");

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
        mode: "onChange",
        resolver: yupResolver(loginSchema),
    });

    const router = useRouter();

    React.useEffect(() => {
        const savedUsercode = localStorage.getItem("usercode");
        if (savedUsercode) {
            setValue("user_code", savedUsercode);
            setValue("keepUserId", true);
        }
    }, [setValue]);

    const { mutate: mutationLogin } = useMutation({
        mutationFn: login,
        onMutate: () => {
            setIsLoading(true);
        },
        onSuccess: () => {
            reset();
            router.push("/dashboard");
            setIsLoading(false);
        },
        onError: (error: any) => {
            setIsLoading(false);

            if (error?.response?.data) {
                const { errorField, message } = error.response.data;

                if (errorField === "usercode") {
                    setError("user_code", { type: "server", message });
                } else if (errorField === "password") {
                    setError("password", { type: "server", message });
                }
            }
        },
    });

    // const handleFormSubmit: SubmitHandler<LoginFormBody> = (data) => {
    //   console.log('Cek Data => ', data);

    //   if (data.keepUserId) {
    //     localStorage.setItem('usercode', watch('user_code'));
    //   }
    //   mutationLogin(data);
    // };

    const handleFormSubmit: SubmitHandler<LoginFormBody> = (data) => {
        console.log("Tombol Login Ditekan");
        console.log("Cek Data => ", data);

        if (data.keepUserId) {
            localStorage.setItem("usercode", watch("user_code"));
        }

        console.log("Mengirim data ke backend:", data);
        mutationLogin(data);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card size="login">
                <CardHeader className="items-center">
                    <Image
                        src="/images/logo-trackwise.png"
                        alt="Run System Logo"
                        className="h-auto"
                        width={250}
                        height={250}
                        layout="responsive"
                        quality={100}
                    />
                </CardHeader>
                <CardTitle className="text-lg font-bold mt-5">
                    Welcome to TrackWise IMM
                </CardTitle>
                <CardDescription className="text-[11px] mt-1">
                    Enter your credentials to access your account
                </CardDescription>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <CardContent className="mt-5 flex flex-col gap-[10px]">
                        <InputField
                            {...authConstant.inputField[0]}
                            {...register("companyId")}
                            message={
                                errors.companyId
                                    ? {
                                          text: errors.companyId.message!,
                                          type: "danger",
                                      }
                                    : undefined
                            }
                        />
                        <InputField
                            {...authConstant.inputField[1]}
                            {...register("user_code")}
                            message={
                                errors.user_code
                                    ? {
                                          text: errors.user_code.message!,
                                          type: "danger",
                                      }
                                    : undefined
                            }
                        />
                        <InputField
                            {...authConstant.inputField[2]}
                            {...register("password")}
                            message={
                                errors.password
                                    ? {
                                          text: errors.password.message!,
                                          type: "danger",
                                      }
                                    : undefined
                            }
                        />
                        <div className="flex justify-between">
                            <Checkbox
                                id="keep-user-id"
                                {...authConstant.checkbox}
                                // {...register('keepUserId')} // kenapa saat menggunakan register value secara default bernilai "on" bukan true atau false
                                checked={watch("keepUserId")}
                                onCheckedChange={(val) =>
                                    setValue("keepUserId", val)
                                }
                            />
                            <Link
                                onClick={() => console.log("clicked")}
                                href="/forgot-password"
                                className="text-[#475569] font-normal text-[11px] justify-end"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </CardContent>
                    <CardFooter className="mt-5">
                        <Button
                            type="submit"
                            className="w-full h-[-30px]"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
