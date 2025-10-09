import React from 'react';

const HeroStats = ({ stats }) => {
  return (
    <ul className="mt-12 grid gap-8 grid-cols-3 rtl:text-right lg:text-right max-lg:text-center">
      {stats.map((stat) => (
        <li key={stat.id}>
          <div className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {stat.value}
          </div>
          <div className="mt-1 text-qusecondary">{stat.label}</div>
        </li>
      ))}
    </ul>
  );
};

export default HeroStats;
