import React from 'react';
import Image from 'next/image';
import { testimonialsData, testimonialsContent } from '../../data/testimonialsData';
import TestimonialsHeader from './TestimonialsHeader';
import TestimonialsCarousel from './TestimonialsCarousel';
import courses_arrow from "../../assets/courses_arrow_white.svg";

const Testimonials = () => {
  return (
      <section className="py-16 px-4 lg:px-12">
          <section className="p-12 bg-primary relative overflow-hidden rounded-3xl">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-84 h-84">
                  <Image
                      src={courses_arrow}
                      alt="course svg arrow"
                      className="absolute left-1 top-1 w-24 sm:w-32 md:w-44 lg:w-56 xl:w-72 h-auto select-none pointer-events-none"
                      width={288}
                      height={288}
                  />
              </div>

              <div className="mx-auto max-w-7xl relative z-10">
                  <TestimonialsHeader content={testimonialsContent} />
                  <TestimonialsCarousel testimonials={testimonialsData} />
              </div>
          </section>
      </section>
  );
};

export default Testimonials;
