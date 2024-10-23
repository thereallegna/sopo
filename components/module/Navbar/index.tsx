import Image from 'next/image';
import React from 'react';

const Navbar = () => (
  <nav className="w-full px-3 py-2 bg-blue-500 text-white">
    {/* Navbar implementation */}
    <Image
      src="images/img-logo-runsystem.svg"
      alt="logo"
      width={100}
      height={100}
    />
  </nav>
);

export default Navbar;
