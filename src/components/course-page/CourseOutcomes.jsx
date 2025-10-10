import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CourseOutcomes = ({ outcomes }) => {
  return (
    <Card className="mt-6 border-0">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 text-right">{outcomes.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg p-4 bg-muted/40">
          {outcomes.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm sm:text-base text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseOutcomes;
