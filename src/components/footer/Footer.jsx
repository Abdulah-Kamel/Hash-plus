import React from 'react';
import { footerData } from '../../data/footerData';
import FooterBrand from './FooterBrand';
import FooterLinks from './FooterLinks';
import FooterContact from './FooterContact';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      {/* Footer Content */}
      <div className="px-4 lg:px-12 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-right">
            {/* Brand Section */}
            <FooterBrand 
              brand={footerData.brand} 
              appDownload={footerData.appDownload} 
            />
            
            {/* Main Pages Links */}
            <FooterLinks 
              title={footerData.mainPages.title} 
              links={footerData.mainPages.links} 
            />
            
            {/* Important Links */}
            <FooterLinks 
              title={footerData.importantLinks.title} 
              links={footerData.importantLinks.links} 
            />
            
            {/* Contact Section */}
            <FooterContact 
              contact={footerData.contact} 
              social={footerData.social} 
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 py-4 px-4 lg:px-12">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Hash+. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
