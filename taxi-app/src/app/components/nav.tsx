import React from 'react';
import Link from 'next/link';
import { FaTaxi } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#5BCEB7] to-[#61B785] text-white w-full">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <FaTaxi size={24} className="mr-2" />
          <Link href="/" className="text-[#fff] text-lg font-semibold">
            Taxi App
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
