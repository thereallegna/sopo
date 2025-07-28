"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getVersion } from "@services/fetcher";

const AuthBackground = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [, setVersion] = useState<string>("");
    React.useEffect(() => {
        getVersion()
            .then((res) => {
                setVersion(res.data.version);
            })
            .catch((e) => console.log(e));
    }, []);
    return (
        <main className="flex flex-col items-center justify-between overflow-hidden h-screen relative">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/background.png"
                    alt="background image"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>

            <div className="flex-grow flex items-center justify-center w-full max-h-[calc(100vh-64px)]">
                {children}
            </div>
        </main>
    );
};

export default AuthBackground;
