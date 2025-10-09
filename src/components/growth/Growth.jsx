import React from 'react';
import { growthIcons, growthContent } from '../../data/growthData';
import FloatingIcon from './FloatingIcon';
import GrowthContent from './GrowthContent';

const Growth = () => {
  return (
    <section className="py-8 md:py-16 px-4 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-2xl md:rounded-3xl px-6 md:px-10 py-12 md:py-20 lg:py-32 overflow-hidden bg-white">
          {/* Floating Icons */}
          {growthIcons.map((iconData) => (
            <FloatingIcon
              key={iconData.id}
              Icon={iconData.Icon}
              color={iconData.color}
              rotation={iconData.rotation}
              position={iconData.position}
              hasColor={iconData.hasColor}
            />
          ))}

          {/* Content */}
          <GrowthContent content={growthContent} />
        </div>
      </div>
    </section>
  );
};

export default Growth;
