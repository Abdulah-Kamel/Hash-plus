"use client";
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Rating from '@/components/shared/Rating';
import { getAllCategories } from '@/components/courses/CourseActions';
const FilterAccordion = ({ idPrefix = "" }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.data.data);
      }
    }
    fetchCategories();
  }, []);
  console.log(categories);
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["categories", "content", "rating", "duration", "level"]}
    >
      {/* الفئات */}
      <AccordionItem value="categories">
        <AccordionTrigger>الفئات</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Checkbox checked={true} id={`all-cat${idPrefix}`} />
              <Label htmlFor={`all-cat${idPrefix}`} className="text-sm font-light">الكل (123)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`courses-cat${idPrefix}`} />
              <Label htmlFor={`courses-cat${idPrefix}`} className="text-sm font-light">دورات (24)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`notes-cat${idPrefix}`} />
              <Label htmlFor={`notes-cat${idPrefix}`} className="text-sm font-light">مذكرات (5)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`camps-cat${idPrefix}`} />
              <Label htmlFor={`camps-cat${idPrefix}`} className="text-sm font-light">معسكرات (12)</Label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* المحتوى */}
      <AccordionItem value="content">
        <AccordionTrigger>المحتوى</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Checkbox checked={true} id={`all-content${idPrefix}`} />
              <Label htmlFor={`all-content${idPrefix}`} className="text-sm font-light">الكل (123)</Label>
            </div>
           {
            categories.map((category) => (
              <div className="flex items-center gap-3" key={category.id}>
                <Checkbox id={`${category.id}-content${idPrefix}`} />
                <Label htmlFor={`${category.id}-content${idPrefix}`} className="text-sm font-light">{category.name}</Label>
              </div>
            ))
           }
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* التقييم */}
      <AccordionItem value="rating">
        <AccordionTrigger>التقييم</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Checkbox id={`rating-5${idPrefix}`} />
              <div className="flex items-center gap-2">
                <Rating rating={4.5} />
                <Label htmlFor={`rating-5${idPrefix}`} className="text-sm font-light">4.5+ (123)</Label>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`rating-4${idPrefix}`} />
              <div className="flex items-center gap-2">
                <Rating rating={4} />
                <Label htmlFor={`rating-4${idPrefix}`} className="text-sm font-light">4.0+ (123)</Label>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`rating-3${idPrefix}`} />
              <div className="flex items-center gap-2">
                <Rating rating={3} />
                <Label htmlFor={`rating-3${idPrefix}`} className="text-sm font-light">3.5+ (123)</Label>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`rating-2${idPrefix}`} />
              <div className="flex items-center gap-2">
                <Rating rating={3} />
                <Label htmlFor={`rating-2${idPrefix}`} className="text-sm font-light">3.0+ (123)</Label>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* مدة الدورة */}
      <AccordionItem value="duration">
        <AccordionTrigger>مدة الدورة</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Checkbox id={`duration-1${idPrefix}`} />
              <Label htmlFor={`duration-1${idPrefix}`} className="text-sm font-light">0-1 ساعة (123)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`duration-3${idPrefix}`} />
              <Label htmlFor={`duration-3${idPrefix}`} className="text-sm font-light">1-3 ساعة (123)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`duration-6${idPrefix}`} />
              <Label htmlFor={`duration-6${idPrefix}`} className="text-sm font-light">3-6 ساعة (123)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`duration-17${idPrefix}`} />
              <Label htmlFor={`duration-17${idPrefix}`} className="text-sm font-light">6-17 ساعة (123)</Label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* المستوى */}
      <AccordionItem value="level">
        <AccordionTrigger>المستوى</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Checkbox id={`beginner${idPrefix}`} />
              <Label htmlFor={`beginner${idPrefix}`} className="text-sm font-light">مبتدئ (123)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`intermediate${idPrefix}`} />
              <Label htmlFor={`intermediate${idPrefix}`} className="text-sm font-light">متوسط (123)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`advanced${idPrefix}`} />
              <Label htmlFor={`advanced${idPrefix}`} className="text-sm font-light">متقدم (123)</Label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterAccordion;
