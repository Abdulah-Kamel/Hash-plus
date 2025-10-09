import React from 'react';
import Image from 'next/image';
import { Video } from 'lucide-react';
import heroPcIcon from "../../assets/hero-pc.svg";
import SuccessGauge from './SuccessGauge';
import StudentsCard from './StudentsCard';

const HeroIllustration = ({ successPercentage, studentProfiles }) => {
  return (
    <div className="flex w-3/6 max-lg:w-full items-center justify-center mt-16">
      <div className="relative w-[576px] h-[662px] max-lg:scale-90">
        {/* Top-left success gauge card */}
        <SuccessGauge percentage={successPercentage} />

        {/* Top-right camera icon */}
        <div className="absolute -top-8 -right-8 bg-secondary text-white w-20 h-20 rounded-full grid place-items-center shadow-xl">
          <Video className="w-8 h-8" />
        </div>

        {/* Main illustration panel */}
        <div className="rounded-[28px] flex justify-center items-center h-full overflow-hidden bg-gradient-to-tl from-primary/85 to-primary p-6 shadow-2xl">
          <Image src={heroPcIcon} alt="واجهة منصتنا" className="w-full h-auto select-none" />
        </div>

        {/* Bottom-right students card */}
        <StudentsCard profiles={studentProfiles} />
      </div>
    </div>
  );
};

export default HeroIllustration;
