import React from 'react';
import { ctaContent } from '../../data/ctaData';
import GeometricPattern from './GeometricPattern';
import CtaContent from './CtaContent';
import { Card, CardContent } from "@/components/ui/card";

const Cta = () => {
  return (
    <section className="py-16 px-4 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Card className="relative bg-primary rounded-3xl overflow-hidden border-0">
          {/* Geometric Pattern Background */}
          <GeometricPattern />
          
          {/* Content */}
          <CardContent className="relative z-10 flex flex-col items-center justify-center text-center px-8 md:px-16 lg:px-20 py-16 md:py-20 lg:py-24">
            <CtaContent content={ctaContent} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Cta;
