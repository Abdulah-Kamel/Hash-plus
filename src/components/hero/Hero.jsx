import React from 'react';
import { heroStats, studentProfiles, successPercentage } from '../../data/heroData';
import HeroContent from './HeroContent';
import HeroIllustration from './HeroIllustration';
import Container  from "@/components/container";

const Hero = () => {
 return (
 <Container className="min-h-[85vh] bg-transparent flex max-lg:flex-col max-lg:items-center max-lg:justify-center justify-between gap-20 px-5 lg:px-20 pt-12">
 <HeroContent stats={heroStats} />
 <HeroIllustration
 successPercentage={successPercentage}
 studentProfiles={studentProfiles}
 />
 </Container>
 );
};

export default Hero;