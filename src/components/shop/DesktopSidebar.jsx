"use client";
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import FilterAccordion from './FilterAccordion';
import { useShopFilterStore } from '@/store/useShopFilterStore';

const DesktopSidebar = () => {
  const { clearFilters, applyFilters } = useShopFilterStore();

  const handleClear = () => {
    clearFilters();
    applyFilters();
  };

  return (
    <div className="hidden xl:block xl:w-1/4">
      <Card className="p-2 border-none shadow-none">
        <CardHeader className="py-2 px-1">
          <div className="flex justify-between items-center">
            <label className="block text-2xl font-medium mb-2 text-right">التصفية</label>
            <p
              role="button"
              className="text-base text-secondary hover:text-secondary/80 cursor-pointer"
              onClick={handleClear}
            >
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
