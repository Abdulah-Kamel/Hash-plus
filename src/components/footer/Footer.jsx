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
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-right">
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
    </footer>
  );
};

export default Footer;
