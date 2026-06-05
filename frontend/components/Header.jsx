import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '/vrsb.png';

const Header = () => {
  return (
    <header
      className="fixed top-0 inset-x-0 transition-all duration-300 backdrop-blur-sm bg-gray-500/70 px-6 mx-5 rounded-full backdrop:backdrop-blur-5xl mt-5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src={Logo} alt="VR Scene Builder" className="w-15 h-15" />
            <span className="hidden text-md font-bold text-gray-300">
                VR Scene Builder
            </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/login" className=''>
            <button className="cursor-pointer text-xs md:text-sm py-2 px-5 text-gray-100 hover:text-gray-200 transition-colors rounded-full">
              Sign in
            </button>
          </Link>
          <Link to="/signup">
            <button className="text-xs md:text-sm cursor-pointer py-1 md:py-2 px-2 md:px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
              <span>Get Started</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
