import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CourseRequirements = ({ requirements }) => {
  return (
    <Card className="mt-6 bg-muted/40 border-0">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 text-right">{requirements.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 text-right">
          {requirements.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CourseRequirements;
