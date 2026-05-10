import React from 'react';
import { growthIcons, growthContent } from '../../data/growthData';
import FloatingIcon from './FloatingIcon';
import GrowthContent from './GrowthContent';
import { Card, CardContent } from "@/components/ui/card";

const Growth = () => {
  return (
    <section className="py-8 md:py-16 px-4 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Card className="relative rounded-2xl md:rounded-3xl overflow-hidden">
          <CardContent className="px-4 md:px-10 py-12 md:py-20 lg:py-32">
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Growth;