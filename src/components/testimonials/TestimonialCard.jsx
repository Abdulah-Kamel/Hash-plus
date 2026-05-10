import React from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="bg-white rounded-3xl shadow-lg h-full flex flex-col">
      <CardHeader>
        {/* Quote Icon */}
        <div className="flex justify-start">
          <div className="bg-teal-400 rounded-full p-5">
            <Quote className="w-8 h-8 text-black" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        {/* Testimonial Text */}
        <p className="text-muted-foreground leading-relaxed text-right">
          {testimonial.testimonial}
        </p>
      </CardContent>

      {/* Author Info */}
      <CardFooter className="text-right border-t pt-6">
        <p className="font-semibold text-gray-900">{testimonial.name} - <span className="text-muted-foreground font-normal">{testimonial.role}</span></p>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
