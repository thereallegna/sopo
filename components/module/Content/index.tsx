import React, { PropsWithChildren, Suspense } from 'react';

const Content = ({ children }: PropsWithChildren) => (
  <div className="w-full h-full flex-1 flex-grow m-5 flex flex-col gap-5">
    <Suspense>{children}</Suspense>
  </div>
);

export default Content;
