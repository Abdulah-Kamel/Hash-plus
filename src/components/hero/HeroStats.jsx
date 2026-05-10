import React from 'react';

const HeroStats = ({ stats }) => {
  return (
    <ul className="mt-12 grid w-full grid-cols-1 gap-8 text-center md:grid-cols-3 lg:text-right">
      {stats.map((stat) => (
        <li key={stat.id}>
          <div className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {stat.value}
          </div>
          <div className="mt-1 text-muted-foreground">{stat.label}</div>
        </li>
      ))}
    </ul>
  );
};

export default HeroStats;
