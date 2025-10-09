'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

const TestimonialsCarousel = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const getCardsToShow = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }
        return 3;
    };

    const [cardsToShow, setCardsToShow] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            setCardsToShow(getCardsToShow());
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - cardsToShow);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    };

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out gap-6"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                    }}
                >
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="flex-shrink-0"
                            style={{ width: `calc(${100 / cardsToShow}% - ${(cardsToShow - 1) * 24 / cardsToShow}px)` }}
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 lg:-translate-x-full lg:ml-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10"
                aria-label="Previous testimonial"
            >
                <ChevronLeft className="w-6 h-6 text-primary" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 lg:translate-x-full lg:mr-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors z-10"
                aria-label="Next testimonial"
            >
                <ChevronRight className="w-6 h-6 text-primary" />
            </button>
        </div>
    );
};

export default TestimonialsCarousel;
