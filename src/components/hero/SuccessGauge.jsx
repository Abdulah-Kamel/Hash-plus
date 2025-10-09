import React from 'react';

const SuccessGauge = ({ percentage }) => {
  return (
    <div className="absolute -top-8 -left-8 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-1 w-60">
      <div className="flex items-center justify-center">
        {/* semicircle gauge */}
        <svg viewBox="0 0 200 100" className="w-40 h-20">
          {/* Background gray arc */}
          <path
            d="M20,100 A80,80 0 0,1 180,100"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Colored progress arc */}
          <path
            d="M20,100 A80,80 0 0,1 180,100"
            fill="none"
            stroke="#BC6CEF"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="251"
            strokeDashoffset="25"
          />
        </svg>
      </div>
      <div className="text-center mt-1">
        <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
        <div className="text-sm text-gray-500">نسبة النجاح</div>
      </div>
    </div>
  );
};

export default SuccessGauge;
