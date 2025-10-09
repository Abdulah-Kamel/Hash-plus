import React from 'react';
import { faqData, faqContent } from '../../data/faqData';
import FaqHeader from './FaqHeader';
import FaqList from './FaqList';

const Faq = () => {
  return (
    <section className="py-16 px-4 lg:px-20 bg-gray-50">
      <div className="mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-start">
          {/* Right Side - Header */}
          <div className="lg:col-span-2">
            <FaqHeader content={faqContent} />
          </div>
          
          {/* Left Side - FAQ List */}
          <div className="lg:col-span-3">
            <FaqList faqs={faqData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
