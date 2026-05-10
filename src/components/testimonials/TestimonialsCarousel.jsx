'use client';
import React from 'react';
import TestimonialCard from './TestimonialCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const TestimonialsCarousel = ({ testimonials }) => {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent className="-ml-6">
                {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                        <TestimonialCard testimonial={testimonial} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 lg:-left-8" />
            <CarouselNext className="-right-4 lg:-right-8" />
        </Carousel>
    );
};

export default TestimonialsCarousel;
