'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CourseDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const canExpand = description.content.length > 300;
  const displayedContent = isExpanded ? description.content : `${description.content.substring(0, 300)}${canExpand ? '...' : ''}`;

  return (
    <div className="text-right space-y-3 py-6 border-b border-gray-200">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900">{description.title}</h2>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {displayedContent}
      </p>
      {canExpand && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary bg-[#BC6CEF0D] px-3 py-2 rounded-lg flex items-center gap-2 hover:underline font-medium text-sm"
        >
          {isExpanded ? 'عرض أقل' : description.link}
          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
};

export default CourseDescription;
