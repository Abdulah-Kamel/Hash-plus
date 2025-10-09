"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
const FaqItem = ({ faq, isFirst }) => {
  const [isOpen, setIsOpen] = useState(isFirst);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-right hover:text-primary transition-colors"
      >
        <span className="text-lg font-medium text-gray-900 flex-1 pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed text-right pr-4">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

export default FaqItem;
