import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import FilterAccordion from './FilterAccordion';

const MobileSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  if (!sidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium text-right">التصفية</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Content */}
          <div>
            <FilterAccordion idPrefix="-mobile" />

            {/* Clear filters button */}
            <div className="pt-4 border-t mt-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSidebarOpen(false)}
              >
                حذف التصفية
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
