import React from 'react';
import Link from 'next/link';
import { Facebook, MessageCircle, Youtube } from 'lucide-react';

const FooterContact = ({ contact, social }) => {
  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'whatsapp':
        return <MessageCircle className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{contact.title}</h3>
      <p className="text-gray-600 mb-4">{contact.email}</p>
      
      {/* Social Icons */}
      <div className="flex gap-3">
        {social.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center  hover:bg-primary hover:text-white hover:border-primary transition-colors"
            aria-label={item.name}
          >
            {getSocialIcon(item.icon)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterContact;
