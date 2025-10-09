import React from 'react';
import Link from 'next/link';
import NavDropdown from './NavDropdown';

const DesktopMenu = ({ navLinks }) => {
  return (
    <div className="hidden lg:flex lg:w-auto lg:order-1">
      <ul className="flex items-center gap-6 font-medium">
        {navLinks.map((link) => {
          if (link.hasDropdown) {
            return (
              <NavDropdown
                key={link.id}
                label={link.label}
                dropdownId={`dropdown${link.label}`}
                items={link.dropdownItems}
              />
            );
          }

          return (
            <li key={link.id}>
              <Link
                href={link.href}
                className={`py-2 px-5 rounded-full ${
                  link.isActive
                    ? 'text-primary bg-gray-100'
                    : 'text-gray hover:text-primary'
                }`}
                aria-current={link.isActive ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DesktopMenu;
