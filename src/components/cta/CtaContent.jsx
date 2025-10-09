import React from 'react';
import Link from 'next/link';

const CtaContent = ({ content }) => {
  return (
    <div className="relative z-10 text-right text-white space-y-6 max-w-2xl ml-auto">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        {content.title}
        <br />
        {content.subtitle}
      </h2>
      
      <p className="text-lg md:text-xl leading-relaxed opacity-90">
        {content.description}
      </p>
      
      <div className="flex gap-4 pt-4 flex-wrap">
        <Link href="/courses" className="bg-white text-primary px-12 sm:px-28 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium">
          {content.cta1}
        </Link>
        <Link href="/contact" className="bg-white text-primary px-12 sm:px-28 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium">
          {content.cta2}
        </Link>
      </div>
    </div>
  );
};

export default CtaContent;
