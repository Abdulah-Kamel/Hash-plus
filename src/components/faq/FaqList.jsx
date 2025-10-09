'use client';
import React from 'react';
import FaqItem from './FaqItem';

const FaqList = ({ faqs }) => {
  return (
    <div className="p-6">
      {faqs.map((faq, index) => (
        <FaqItem key={faq.id} faq={faq} isFirst={index === 0} />
      ))}
    </div>
  );
};

export default FaqList;
