import React, { PropsWithChildren } from 'react';

const Content = ({ children }: PropsWithChildren) => (
  <div className="w-full h-full flex-1 flex-grow flex flex-col gap-[10px]">
    {children}
  </div>
);

export default Content;
