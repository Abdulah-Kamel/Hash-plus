import React from 'react';
import { Search } from 'lucide-react';

const NavSearch = ({ isMobile = false }) => {
  return (
    <form className={isMobile ? "py-2" : "max-w-md"}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className={`text-gray-500 ${isMobile ? 'w-4 h-4' : 'w-6 h-6'}`} />
        </div>
        <input
          type="search"
          className={`p-3 ps-10 text-sm rounded-full border-none bg-gray-100 focus:ring-0 ${
            isMobile ? 'w-full' : 'w-56'
          }`}
          placeholder="ابحث هنا"
          required
        />
      </div>
    </form>
  );
};

export default NavSearch;
