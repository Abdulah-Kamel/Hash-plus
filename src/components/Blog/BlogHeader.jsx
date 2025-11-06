import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const BlogHeader = () => {
  return (
    <div className="w-full">
      <Card className="flex sm:flex-row justify-between w-full border-none shadow-none">
        <h3 className="text-xl font-bold mb-4 text-right">جميع المقالات</h3>
        <div className="mb-6 flex max-sm:flex-col max-sm gap-y-4 justify-between items-center gap-2">
            <div className="flex items-center gap-4">
                <Select dir={"rtl"}>
                    <SelectTrigger className="py-3 px-6 border-gray-300 rounded-full">
                        <SelectValue placeholder="الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="education">التعليم</SelectItem>
                            <SelectItem value="programming">البرمجة</SelectItem>
                            <SelectItem value="design">المقالات</SelectItem>
                            <SelectItem value="marketing">المذكرات</SelectItem>
                            <SelectItem value="marketing">المعسكرات</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select dir={"rtl"}>
                    <SelectTrigger className="py-3 px-6 border-gray-300 rounded-full">
                        <SelectValue placeholder="تصفية" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="popular">الاكثر مشاهدة</SelectItem>
                            <SelectItem value="newest">الاحدث</SelectItem>
                            <SelectItem value="oldest">الاقدم</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogHeader;
