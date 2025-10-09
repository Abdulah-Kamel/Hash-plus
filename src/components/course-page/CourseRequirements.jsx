import React from 'react';

const CourseRequirements = ({ requirements }) => {
  return (
    <div className="mt-6 text-right bg-gray-50 rounded-lg p-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{requirements.title}</h2>
      <ul className="space-y-2">
        {requirements.items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-600">
            <span className="text-primary mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseRequirements;
