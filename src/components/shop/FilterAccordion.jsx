import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Rating from '@/components/shared/Rating';

const FilterAccordion = ({ idPrefix = "" }) => {
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
              <Checkbox id={`all-cat${idPrefix}`} />
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
              <Checkbox id={`all-content${idPrefix}`} />
              <Label htmlFor={`all-content${idPrefix}`} className="text-sm font-light">الكل (123)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`programming${idPrefix}`} />
              <Label htmlFor={`programming${idPrefix}`} className="text-sm font-light">برمجة التطبيقات (24)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`web-programming${idPrefix}`} />
              <Label htmlFor={`web-programming${idPrefix}`} className="text-sm font-light">برمجة المواقع (9)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`ai-programming${idPrefix}`} />
              <Label htmlFor={`ai-programming${idPrefix}`} className="text-sm font-light">برمجة الذكاء (123)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`data-analysis${idPrefix}`} />
              <Label htmlFor={`data-analysis${idPrefix}`} className="text-sm font-light">تحليل البيانات (9)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`mobile-design${idPrefix}`} />
              <Label htmlFor={`mobile-design${idPrefix}`} className="text-sm font-light">تصميم المواقع (17)</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`app-design${idPrefix}`} />
              <Label htmlFor={`app-design${idPrefix}`} className="text-sm font-light">تصميم التطبيقات (24)</Label>
            </div>
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
