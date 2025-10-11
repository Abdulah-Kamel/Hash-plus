import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import FilterAccordion from './FilterAccordion';

const DesktopSidebar = () => {
  return (
    <div className="hidden xl:block xl:w-1/4">
      <Card className="p-2 border-none shadow-none">
        <CardHeader className="py-2 px-1">
          <div className="flex justify-between items-center">
            <label className="block text-2xl font-medium mb-2 text-right">التصفية</label>
            <p role="button" className="text-base text-secondary hover:text-secondary/80 cursor-pointer">
              حذف التصفية
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <FilterAccordion />
        </CardContent>
      </Card>
    </div>
  );
};

export default DesktopSidebar;
