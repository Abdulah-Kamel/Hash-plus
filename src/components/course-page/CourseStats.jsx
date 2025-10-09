import React from 'react';
import { Play, GraduationCap, Heart, Star } from 'lucide-react';

const CourseStats = () => {
  const stats = [
    { id: 1, icon: Play, label: '12 محتوى', color: 'bg-teal-400' },
    { id: 2, icon: GraduationCap, label: '10,170 طالب', color: 'bg-teal-400' },
    { id: 3, icon: Heart, label: '12,561 تقييم', color: 'bg-teal-400' },
    { id: 4, icon: Star, label: '4.6 تقييم المعلم', color: 'bg-teal-400' },
  ];

  return (
    <div className="mt-6 text-right">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">الدورة في أرقام</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-[#33E2BD0D] rounded-xl p-4 text-center">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <p className="text-xs sm:text-base text-gray-900">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseStats;
