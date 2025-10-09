import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <div className="flex-1 bg-white rounded-3xl px-6 py-5 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <div className="flex flex-col h-full gap-y-8">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="text-3xl font-bold text-gray-900 mt-3">
            {category.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600">
            {category.description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-auto">
          {/* Arrow Button */}
          <Link href={`/courses?category=${category.title}`} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>

          {/* Icon */}
          <div className={`w-22 h-22 flex items-center justify-center ${category.bgColor} rounded-full`}>
            <Image src={category.icon} alt={category.title} className="w-full h-full object-contain" width={88} height={88} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
