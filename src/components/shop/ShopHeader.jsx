import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Filter } from 'lucide-react';

const ShopHeader = ({ selectedSort, setSelectedSort, setSidebarOpen }) => {
  return (
    <div className="w-full">
      <Card className="flex sm:flex-row justify-between w-full border-none shadow-none">
        <h3 className="text-xl font-bold mb-4 text-right">التعليم</h3>

        {/* Sort dropdown */}
        <div className="mb-6 flex max-sm:flex-col max-sm gap-y-4 justify-between items-center gap-2">
          {/* Mobile Filter Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="xl:hidden flex items-center gap-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Filter className="h-4 w-4" />
            تصفية
          </Button>
            <div className="flex items-center gap-1">
                <Select dir={"rtl"} onValueChange={setSelectedSort}>
                    <SelectTrigger className="py-2 px-8 border-gray-800 rounded-full">
                        <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="newest">الاحدث</SelectItem>
                            <SelectItem value="old">الاقدم</SelectItem>
                            <SelectItem value="priceUp">السعر من الاعلى للاقل</SelectItem>
                            <SelectItem value="priceDown">السعر من الاقل للاعلى</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <p className="text-base text-muted-foreground">النتايج: 1720</p>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default ShopHeader;
