import React from 'react';
import Link from 'next/link';

const FaqHeader = ({ content }) => {
  return (
    <div className="text-right space-y-4">
      <div className="inline-block px-4 py-2 bg-indigo-100 text-primary rounded-full text-sm">
        {content.badge}
      </div>
      
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-normal">
        {content.title}
        <br />
        {content.subtitle}
      </h2>
      
      <p className="text-gray-600 text-lg">
        {content.description}
      </p>
      
      <div className="pt-4">
        <Link href="/contact" className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors font-medium">
          {content.ctaText}
        </Link>
      </div>
    </div>
  );
};

export default FaqHeader;
