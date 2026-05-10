import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {hasHalfStar && <StarHalf key="half" fill="currentColor" className="w-4 h-4 text-yellow-300" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} fill="currentColor" className="w-4 h-4 text-gray-300" />
      ))}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" className="w-4 h-4 text-yellow-300" />
      ))}
    </div>
  );
};

export default Rating;
