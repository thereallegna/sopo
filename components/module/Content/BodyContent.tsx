"use client";

import React, { PropsWithChildren, Suspense } from "react";

const BodyContent = ({ children }: PropsWithChildren) => (
    <div className="p-5">
        <Suspense>{children}</Suspense>
    </div>
);

export default BodyContent;
