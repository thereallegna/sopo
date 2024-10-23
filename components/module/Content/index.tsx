import React, { PropsWithChildren } from 'react';

const Content = ({ children }: PropsWithChildren) => (
  <div className="w-full h-full flex-1 flex-grow p-5 flex flex-col gap-5">
    {children}
  </div>
);

export default Content;
