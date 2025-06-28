// 'use client';

// import React from 'react';

// const Home = () => {
//   // buat fungsi submited ketika onSubmit
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     console.log('Submit handler called'); // Logging awal
//     e.preventDefault();
//     console.log('Form submitted');
//   };

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <h1 className="text-4xl font-bold text-center sm:text-left">
//           Welcome to Next.js!
//         </h1>
//         <p className="text-lg text-center sm:text-left">
//           Get started by editing <code>pages/index.tsx</code>
//         </p>
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col gap-4 items-center sm:items-start"
//         >
//           <button
//             type="submit"
//             className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
//           >
//             Submit
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// };

// export default Home;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace("/login");
    }, [router]);

    return null;
};

export default Home;
