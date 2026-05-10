import React from 'react';
import Image from 'next/image';
import { testimonialsData, testimonialsContent } from '../../data/testimonialsData';
import TestimonialsHeader from './TestimonialsHeader';
import TestimonialsCarousel from './TestimonialsCarousel';
import courses_arrow from "../../assets/courses_arrow_white.svg";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  return (
      <section className="py-16 px-4 lg:px-12">
          <Card className="bg-primary relative overflow-hidden rounded-3xl border-0">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-3/4 h-3/4">
                  <Image
                      src={courses_arrow}
                      alt="course svg arrow"
                      className="absolute left-1 top-1 select-none pointer-events-none"
                      width={288}
                      height={288}
                  />
              </div>

              <CardContent className="mx-auto relative z-10 p-12">
                  <TestimonialsHeader content={testimonialsContent} />
                  <TestimonialsCarousel testimonials={testimonialsData} />
              </CardContent>
          </Card>
      </section>
  );
};

export default Testimonials;