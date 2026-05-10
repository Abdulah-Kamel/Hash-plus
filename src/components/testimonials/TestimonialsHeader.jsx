import React from 'react';

const TestimonialsHeader = ({ content }) => {
  return (
    <div className="text-right mb-12">
      <div className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm mb-4">
        {content.badge}
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
        {content.title}
      </h2>
    </div>
  );
};

export default TestimonialsHeader;
