import Container from "@/components/container";
import Footer from "@/components/footer";
import { NavBar } from "@/components/navbar";
import React from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomPagination from "@/components/shared/CustomPagination";
import StudentsHeader from "@/components/students/StudentsHeader";
import StudentsCard from "@/components/students/StudentsCard";
const StudentsPage = () => {
  return (
    <>
      <StudentsHeader />
      <Container>
        <div className="w-full">
          <Card className="flex sm:flex-row justify-between w-full border-none shadow-none">
            <h3 className="text-xl font-bold mb-4 text-right">
              قائمة التقنيين
            </h3>
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
                    <SelectValue placeholder="ترتيب حسب" />
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
        <div className="grid grid-cols-1 gap-6 mb-8">
          {Array.from({ length: 8 }, (_, index) => {
            return <StudentsCard key={index} />;
          })}
        </div>
        <CustomPagination />
      </Container>
    </>
  );
};

export default StudentsPage;
