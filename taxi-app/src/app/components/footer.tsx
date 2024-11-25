import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#5BCEB7] to-[#61B785] text-white w-full">
      <div className="max-w-screen-xl mx-auto px-6 py-4 text-center">
        <p className="text-[#fff] text-sm">
          &copy; {new Date().getFullYear()} Taxi App - Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
