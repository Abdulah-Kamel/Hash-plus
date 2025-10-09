import React from 'react';
import { ctaContent } from '../../data/ctaData';
import GeometricPattern from './GeometricPattern';
import CtaContent from './CtaContent';

const Cta = () => {
  return (
    <section className="py-16 px-4 lg:px-12">
      <div className="mx-auto">
        <div className="relative bg-primary rounded-3xl px-8 md:px-16 lg:px-20 py-16 md:py-20 lg:py-24 overflow-hidden">
          {/* Geometric Pattern Background */}
          <GeometricPattern />
          
          {/* Content */}
          <CtaContent content={ctaContent} />
        </div>
      </div>
    </section>
  );
};

export default Cta;
