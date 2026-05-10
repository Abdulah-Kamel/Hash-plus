import React from 'react';
import Image from 'next/image';
import { Video } from 'lucide-react';
import heroPcIcon from "../../assets/hero-pc.svg";
import SuccessGauge from './SuccessGauge';
import StudentsCard from './StudentsCard';
import { Card } from "@/components/ui/card";

const HeroIllustration = ({ successPercentage, studentProfiles }) => {
  return (
    <div className="w-full lg:w-3/6 flex items-center justify-center mt-16">
      <div className="relative w-full max-w-2xl aspect-[576/662]">
        {/* Top-left success gauge card */}
        <SuccessGauge percentage={successPercentage} />

        {/* Top-right camera icon */}
        <Card className="absolute -top-10 sm:-top-8 -right-4 sm:-right-8 bg-secondary text-white w-20 h-20 rounded-full grid place-items-center shadow-xl">
          <Video className="w-8 h-8" />
        </Card>

        {/* Main illustration panel */}
        <div className="rounded-3xl flex justify-center items-center h-full overflow-hidden bg-gradient-to-tl from-primary/85 to-primary p-6 shadow-2xl">
          <Image src={heroPcIcon} alt="واجهة منصتنا" className="w-full h-auto select-none" priority />
        </div>

        {/* Bottom-right students card */}
        <StudentsCard profiles={studentProfiles} />
      </div>
    </div>
  );
};

export default HeroIllustration;
