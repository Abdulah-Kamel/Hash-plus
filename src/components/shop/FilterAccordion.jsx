"use client";
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Rating from '@/components/shared/Rating';
import { getAllCategories } from '@/components/courses/CourseActions';
import { useShopFilterStore } from '@/store/useShopFilterStore';

const contentTypes = [
  { value: "course", label: "كورسات" },
  { value: "bootcamp", label: "معسكرات" },
];

const levels = [
  { value: "beginner", label: "مبتدئ" },
  { value: "intermediate", label: "متوسط" },
  { value: "advanced", label: "متقدم" },
];

const ratings = [
  { value: 4.5, label: "4.5+" },
  { value: 4, label: "4.0+" },
  { value: 3.5, label: "3.5+" },
  { value: 3, label: "3.0+" },
];

const durations = [
  { min: 0, max: 1, label: "0-1 ساعة" },
  { min: 1, max: 3, label: "1-3 ساعة" },
  { min: 3, max: 6, label: "3-6 ساعة" },
  { min: 6, max: 17, label: "6-17 ساعة" },
];

const FilterAccordion = ({ idPrefix = "" }) => {
  const [categories, setCategories] = useState([]);

  const {
    selectedCategories,
    selectedContentTypes,
    selectedLevels,
    selectedRating,
    selectedDuration,
    toggleCategory,
    toggleContentType,
    toggleLevel,
    setSelectedRating,
    setSelectedDuration,
    applyFilters,
  } = useShopFilterStore();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.success) {
        setCategories(res.data.data || []);
      }
    };
    fetchCategories();
  }, []);

  // Apply filters whenever any filter changes
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, selectedContentTypes, selectedLevels, selectedRating, selectedDuration]);

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["categories", "content", "rating", "duration", "level"]}
    >
      {/* الفئات - Categories */}
      <AccordionItem value="categories">
        <AccordionTrigger>الفئات</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-3">
            {categories.map((category) => (
              <div className="flex items-center gap-3" key={category._id}>
                <Checkbox
                  id={`${category._id}-cat${idPrefix}`}
                  checked={selectedCategories.includes(category._id)}
                  onCheckedChange={() => toggleCategory(category._id)}
                />
                <Label htmlFor={`${category._id}-cat${idPrefix}`} className="text-sm font-light cursor-pointer">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* التقييم - Rating */}
      <AccordionItem value="rating">
        <AccordionTrigger>التقييم</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-3">
            {ratings.map((r) => (
              <div className="flex items-center gap-3" key={r.value}>
                <Checkbox
                  id={`rating-${r.value}${idPrefix}`}
                  checked={selectedRating === r.value}
                  onCheckedChange={() => setSelectedRating(r.value)}
                />
                <div className="flex items-center gap-2">
                  <Rating rating={r.value} />
                  <Label htmlFor={`rating-${r.value}${idPrefix}`} className="text-sm font-light cursor-pointer">
                    {r.label}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* مدة الدورة - Duration */}
      <AccordionItem value="duration">
        <AccordionTrigger>مدة الدورة</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-3">
            {durations.map((d) => (
              <div className="flex items-center gap-3" key={`${d.min}-${d.max}`}>
                <Checkbox
                  id={`duration-${d.min}-${d.max}${idPrefix}`}
                  checked={
                    selectedDuration?.min === d.min &&
                    selectedDuration?.max === d.max
                  }
                  onCheckedChange={() => setSelectedDuration(d)}
                />
                <Label htmlFor={`duration-${d.min}-${d.max}${idPrefix}`} className="text-sm font-light cursor-pointer">
                  {d.label}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* المستوى - Level */}
      <AccordionItem value="level">
        <AccordionTrigger>المستوى</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-3">
            {levels.map((l) => (
              <div className="flex items-center gap-3" key={l.value}>
                <Checkbox
                  id={`${l.value}${idPrefix}`}
                  checked={selectedLevels.includes(l.value)}
                  onCheckedChange={() => toggleLevel(l.value)}
                />
                <Label htmlFor={`${l.value}${idPrefix}`} className="text-sm font-light cursor-pointer">
                  {l.label}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterAccordion;
