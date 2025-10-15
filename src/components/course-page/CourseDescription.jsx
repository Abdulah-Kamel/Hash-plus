import React from 'react';
import { ChevronDown } from 'lucide-react';

const CourseDescription = ({ description }) => {
    return (
        <div className="text-right space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">{description?.title}</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {description?.content}
            </p>
            <button className="text-primary bg-[#BC6CEF0D] px-3 py-2 rounded-lg flex items-center gap-2 hover:underline font-medium text-sm">
                {description?.link}
                <ChevronDown className="w-4 h-4 ml-1" />
            </button>
        </div>
    );
};

export default CourseDescription;
