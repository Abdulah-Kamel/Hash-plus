"use client";
import React from 'react';
import { Menu } from 'lucide-react';
import { navLinks } from '../../data/navigationData';
import NavLogo from './NavLogo';
import NavActions from './NavActions';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

export function NavBar() {
  return (
    <>
      <nav className="sticky w-full z-20 top-0 start-0 bg-white/80 backdrop-blur">
        <div className="flex flex-wrap w-full items-center justify-between p-4 lg:px-12">
          <NavLogo />
          <NavActions />
          <DesktopMenu navLinks={navLinks} />

          {/* Mobile: drawer trigger */}
          <button
            className="lg:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            type="button"
            data-drawer-target="mobile-nav"
            data-drawer-show="mobile-nav"
            data-drawer-placement="right"
            aria-controls="mobile-nav"
            aria-expanded="false"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <MobileMenu navLinks={navLinks} />
    </>
  );
}
