import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg h-full flex flex-col">
      {/* Quote Icon */}
      <div className="flex justify-start mb-4">
        <div className="bg-teal-400 rounded-full p-5">
          <Quote className="w-8 h-8 text-black" />
        </div>
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 leading-relaxed text-right mb-6 flex-grow">
        {testimonial.testimonial}
      </p>

      {/* Author Info */}
      <div className="text-right border-t pt-4">
        <p className="font-semibold text-gray-900">{testimonial.name} - <span className="text-gray-600 font-normal">{testimonial.role}</span></p>
      </div>
    </div>
  );
};

export default TestimonialCard;
