import React from 'react';
import Image from 'next/image';

const AuthBackground = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <main className="flex flex-col items-center justify-between min-h-screen relative">
    <div className="absolute inset-0 -z-10">
      <Image
        src="/images/background.png"
        alt="background image"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>

    <div className="flex-grow">{children}</div>

    <footer className="w-full p-4 text-[12px] text-white text-center">
      <p>RUN System Inc. Version 8.007</p>
    </footer>
  </main>
);

export default AuthBackground;
