import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const CtaContent = ({ content }) => {
  return (
    <div className="relative z-10 text-center text-white space-y-6 max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        {content.title}
        <br />
        {content.subtitle}
      </h2>
      
      <p className="text-lg md:text-xl leading-relaxed opacity-90">
        {content.description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
        <Button asChild size="lg" className="rounded-full font-medium">
            <Link href="/courses">
                {content.cta1}
            </Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="rounded-full font-medium">
            <Link href="/contact">
                {content.cta2}
            </Link>
        </Button>
      </div>
    </div>
  );
};

export default CtaContent;
