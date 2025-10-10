'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

const CourseDescription = ({ description }) => {
  const canExpand = description.content.length > 300;
  const collapsedContent = `${description.content.substring(0, 300)}${canExpand ? '...' : ''}`;

  return (
    <div className="text-right space-y-3 py-6 border-b border-gray-200">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900">{description.title}</h2>
      <Collapsible>
        <CollapsibleContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {canExpand ? description.content : collapsedContent}
        </CollapsibleContent>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {!canExpand ? description.content : collapsedContent}
        </p>
        {canExpand && (
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="text-primary flex items-center gap-2 hover:underline font-medium text-sm mt-2">
                    <span className="collapsible-text">{description.link}</span>
                    <ChevronDown className="w-4 h-4 ml-1 transition-transform" />
                </Button>
            </CollapsibleTrigger>
        )}
      </Collapsible>
    </div>
  );
};

export default CourseDescription;
