'use client';
import React from 'react';
import { Play, FileText } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const CourseSidebar = ({ data }) => {

  return (
    <Card className="sticky top-24">
        <CardHeader className="text-right">
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{data.title}</CardTitle>
            <CardDescription className="text-sm text-gray-600">{data.subtitle}</CardDescription>
        </CardHeader>
      <CardContent>
      <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
        {data.sections.map((section) => (
          <AccordionItem value={`item-${section.id}`} key={section.id}>
            <AccordionTrigger>
                <div className="flex-1 text-right ml-2">
                    <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
                    <p className="text-xs text-gray-500">{section.duration}</p>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-3 flex items-center gap-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {/* Checkbox/Status */}
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${ lesson.completed ? 'bg-primary border-primary' : 'border-gray-300' }`}>
                      {lesson.completed && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 text-right">
                      <p className="text-sm text-gray-900">{lesson.title}</p>
                    </div>

                    {/* Duration */}
                    {lesson.duration && (
                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                    )}

                    {/* Icon */}
                    <div className="flex-shrink-0">
                      {lesson.type === 'video' ? (
                        <Play className="w-4 h-4 text-gray-400" />
                      ) : (
                        <FileText className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </CardContent>
    </Card>
  );
};

export default CourseSidebar;
