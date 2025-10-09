import React from 'react';
import Link from 'next/link';
import { X, ChevronDown } from 'lucide-react';
import NavSearch from './NavSearch';

const MobileMenu = ({ navLinks }) => {
  return (
    <div
      id="mobile-nav"
      className="fixed top-0 right-0 z-40 h-screen w-72 translate-x-full bg-white p-4 shadow-lg transition-transform lg:hidden"
      tabIndex="-1"
      aria-labelledby="mobile-nav-label"
    >
      <div className="flex items-center justify-between mb-6">
        <h5 id="mobile-nav-label" className="text-base font-semibold text-gray-900">
          القائمة
        </h5>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm p-2 inline-flex items-center"
          data-drawer-hide="mobile-nav"
          aria-controls="mobile-nav"
        >
          <span className="sr-only">Close sidebar</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile menu content */}
      <ul className="space-y-2 font-medium">
        {navLinks.map((link) => {
          if (link.hasDropdown) {
            return (
              <li key={link.id}>
                <button
                  id={`m${link.label}Button`}
                  data-dropdown-toggle={`m${link.label}Menu`}
                  className="flex w-full items-center justify-between py-2 px-3 rounded hover:bg-gray-100"
                >
                  {link.label}
                  <ChevronDown className="w-6 h-6" />
                </button>
                <div
                  id={`m${link.label}Menu`}
                  className="z-30 hidden font-normal divide-y divide-gray-100 rounded-lg shadow-sm w-full bg-white"
                >
                  <ul className="py-2 text-sm text-gray-700" aria-labelledby={`m${link.label}Button`}>
                    {link.dropdownItems.map((item) => (
                      <li key={item.id}>
                        <Link href={item.href} className="block px-4 py-2 hover:bg-gray-50">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          }

          return (
            <li key={link.id}>
              <Link href={link.href} className="block py-2 px-3 rounded hover:bg-gray-100">
                {link.label}
              </Link>
            </li>
          );
        })}

        {/* Search and login in drawer */}
        <li className="pt-2 border-t">
          <NavSearch isMobile />
          <Link href="/login" className="w-full block text-white text-center bg-primary rounded-full py-2 mt-2">
            تسجيل الدخول
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
