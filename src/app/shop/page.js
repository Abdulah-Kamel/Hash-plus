'use client';
import React, { useState } from 'react';
import Container from '@/components/container';
import {Card, CardContent, CardHeader} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { ChevronDown, Filter, X } from 'lucide-react';
import Rating from '@/components/shared/Rating';
import Image from 'next/image';
import {NavBar} from "@/components/navbar";
import Footer from "@/components/footer";
import {CourseCard} from "@/components/courses";
import courseImage from "@/assets/course1.png"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// Mock data for courses
const coursesData = [
  {
    id: 1,
    title: 'مذكرات Javascript',
    instructor: 'ولاء القحطانى',
    rating: 4.5,
    reviews: 1024,
    price: 50,
    originalPrice: 80,
    image: courseImage,
    badge: 'الأكثر مبيعا',
    badgeColor: 'bg-green-500',
    duration:40,
    lessons:40
  },
  {
    id: 2,
    title: 'مذكرات Javascript',
    instructor: 'ولاء القحطانى',
    rating: 4.5,
    reviews: 1024,
    price: 50,
    originalPrice: 80,
    image: courseImage,
    badge: 'الأكثر تقييما',
    badgeColor: 'bg-blue-500',
    duration:40,
    lessons:40
  },
  {
    id: 3,
    title: 'مذكرات Javascript',
    instructor: 'ولاء القحطانى',
    rating: 4.5,
    reviews: 1024,
    price: 50,
    originalPrice: 80,
    image: courseImage,
    badge: 'الأكثر تقييما',
    badgeColor: 'bg-purple-500',
    duration:40,
    lessons:40
  }
];

const ShopPage = () => {
  const [selectedSort, setSelectedSort] = useState('الأحدث');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="min-h-screen bg-primary">
      {/* Navigation Bar */}
     <NavBar/>

      {/* Hero Section */}
      <div className="relative overflow-hidden py-14">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white/20 rounded-full"></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-400/20 to-transparent rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full"></div>
        
        <Container className="relative z-10 py-16 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">التعليم</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            منصتنا توفر تجربة تعليمية شاملة مع أحدث التقنيات في مجال التعليم الرقمي<br/>
            لضمان تقديم أفضل تجربة تعليمية ممكنة وتحقيق أهدافك التعليمية
          </p>
        </Container>
      </div>

      {/* Main Content */}
      <div className="bg-white">
          <Container className="py-8">
              <div className="w-full">
                  <Card className="flex sm:flex-row justify-between w-full border-none shadow-none">
                      <h3 className="text-xl font-bold mb-4 text-right">التعليم</h3>

                      {/* Sort dropdown */}
                      <div className="mb-6 flex items-center gap-2">
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
                          
                          <Select dir={"rtl"}>
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
                  </Card>
              </div>
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden xl:block xl:w-1/4">
              <Card className="p-2 border-none shadow-none">
                <CardHeader className="py-2 px-1">
                    <div className="flex justify-between items-center">
                  <label className="block text-2xl font-medium mb-2 text-right">التصفية</label>
                  <p role="button" className="text-base text-secondary hover:text-secondary/80 cursor-pointer">حذف التصفية</p>
                    </div>
                </CardHeader>
                  <CardContent>
                {/* Add your filter content here */}
                    <Accordion
                    type="multiple"
                    className="w-full"
                    defaultValue={["categories", "content", "rating", "duration", "level"]}
                    >
                    {/* الفئات */}
                    <AccordionItem value="categories">
                    <AccordionTrigger>الفئات</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 mt-1">
                        <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                        <Checkbox id="all-cat" />
                        <Label htmlFor="all-cat" className="text-sm font-light">الكل (123)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="courses-cat" />
                        <Label htmlFor="courses-cat" className="text-sm font-light">دورات (24)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="notes-cat" />
                        <Label htmlFor="notes-cat" className="text-sm font-light">مذكرات (5)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="camps-cat" />
                        <Label htmlFor="camps-cat" className="text-sm font-light">معسكرات (12)</Label>
                        </div>
                        </div>
                    </AccordionContent>
                    </AccordionItem>

                    {/* المحتوى */}
                    <AccordionItem value="content">
                    <AccordionTrigger>المحتوى</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 mt-1">
                        <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                        <Checkbox id="all-content" />
                        <Label htmlFor="all-content" className="text-sm font-light">الكل (123)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="programming" />
                        <Label htmlFor="programming" className="text-sm font-light">برمجة التطبيقات (24)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="web-programming" />
                        <Label htmlFor="web-programming" className="text-sm font-light">برمجة المواقع (9)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="ai-programming" />
                        <Label htmlFor="ai-programming" className="text-sm font-light">برمجة الذكاء (123)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="data-analysis" />
                        <Label htmlFor="data-analysis" className="text-sm font-light">تحليل البيانات (9)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="mobile-design" />
                        <Label htmlFor="mobile-design" className="text-sm font-light">تصميم المواقع (17)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="app-design" />
                        <Label htmlFor="app-design" className="text-sm font-light">تصميم التطبيقات (24)</Label>
                        </div>
                        </div>
                    </AccordionContent>
                    </AccordionItem>

                    {/* التقييم */}
                    <AccordionItem value="rating">
                    <AccordionTrigger>التقييم</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 mt-1">
                        <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                        <Checkbox id="rating-5" />
                        <div className="flex items-center gap-2">
                        <Rating rating={4.5} />
                        <Label htmlFor="rating-5" className="text-sm font-light">4.5+ (123)</Label>
                        </div>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="rating-4" />
                        <div className="flex items-center gap-2">
                        <Rating rating={4} />
                        <Label htmlFor="rating-4" className="text-sm font-light">4.0+ (123)</Label>
                        </div>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="rating-3" />
                        <div className="flex items-center gap-2">
                        <Rating rating={3} />
                        <Label htmlFor="rating-3" className="text-sm font-light">3.5+ (123)</Label>
                        </div>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="rating-2" />
                        <div className="flex items-center gap-2">
                        <Rating rating={3} />
                        <Label htmlFor="rating-2" className="text-sm font-light">3.0+ (123)</Label>
                        </div>
                        </div>
                        </div>
                    </AccordionContent>
                    </AccordionItem>

                    {/* مدة الدورة */}
                    <AccordionItem value="duration">
                    <AccordionTrigger>مدة الدورة</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 mt-1">
                        <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                        <Checkbox id="duration-1" />
                        <Label htmlFor="duration-1" className="text-sm font-light">0-1 ساعة (123)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="duration-3" />
                        <Label htmlFor="duration-3" className="text-sm font-light">1-3 ساعة (123)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="duration-6" />
                        <Label htmlFor="duration-6" className="text-sm font-light">3-6 ساعة (123)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="duration-17" />
                        <Label htmlFor="duration-17" className="text-sm font-light">6-17 ساعة (123)</Label>
                        </div>
                        </div>
                    </AccordionContent>
                    </AccordionItem>

                    {/* المستوى */}
                    <AccordionItem value="level">
                    <AccordionTrigger>المستوى</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3 mt-1">
                        <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                        <Checkbox id="beginner" />
                        <Label htmlFor="beginner" className="text-sm font-light">مبتدئ (123)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="intermediate" />
                        <Label htmlFor="intermediate" className="text-sm font-light">متوسط (123)</Label>
                        </div>
                        <div className="flex items-center gap-3">
                        <Checkbox id="advanced" />
                        <Label htmlFor="advanced" className="text-sm font-light">متقدم (123)</Label>
                        </div>
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 xl:hidden">
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black/50" 
                  onClick={() => setSidebarOpen(false)}
                />

                  {/* Desktop Sidebar */}
                  <div className="hidden xl:block xl:w-1/4">
                      <Card className="p-6">
                          <CardHeader className="py-2 px-1">
                              <div className="flex justify-between items-center">
                                  <label className="block text-2xl font-medium mb-2 text-right">التصفية</label>
                                  <p role="button" className="text-sm">حذف التصفية</p>
                              </div>
                          </CardHeader>
                          {/* Add your filter content here */}
                          <CardContent className="px-1">
                              {/* Price filter */}
                              <div className="mb-6">
                                  <label className="block text-sm font-medium mb-2 text-right">السعر</label>
                                  <div className="text-right text-2xl font-bold">1750 ريال</div>
                              </div>

                              {/* Categories */}
                              <div className="space-y-3">
                                  <h4 className="font-medium text-right">التصنيف</h4>
                                  <div className="space-y-2 text-right">
                                      <div className="text-sm text-gray-600">جميع الفئات</div>
                                      <div className="text-sm text-gray-600">الفئات</div>
                                      <div className="text-sm text-gray-600">دورات CSS</div>
                                      <div className="text-sm text-gray-600">دورات HTML</div>
                                      <div className="text-sm text-gray-600">دورات JavaScript</div>
                                  </div>
                              </div>

                              {/* Ratings filter */}
                              <div className="mt-6">
                                  <h4 className="font-medium text-right mb-3">التقييم</h4>
                                  <div className="space-y-2">
                                      {[5, 4, 3, 2, 1].map((stars) => (
                                          <div key={stars} className="flex items-center justify-end gap-2">
                                              <span className="text-sm text-gray-600">{stars}</span>
                                              <Rating rating={stars} />
                                          </div>
                                      ))}
                                  </div>
                              </div>

                              {/* Level filter */}
                              <div className="mt-6">
                                  <h4 className="font-medium text-right mb-3">المستوى</h4>
                                  <div className="space-y-2 text-right text-sm text-gray-600">
                                      <div>جميع المستويات</div>
                                      <div>مبتدئ</div>
                                      <div>متوسط</div>
                                      <div>متقدم</div>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  </div>

                  {/* Mobile Sidebar Overlay */}
                  <div className={`fixed inset-0 z-50 xl:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      {/* Backdrop */}
                      <div
                          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
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
                                  <Accordion
                                      type="multiple"
                                      className="w-full"
                                      defaultValue={["categories", "content", "rating", "duration", "level"]}
                                  >
                                      {/* الفئات */}
                                      <AccordionItem value="categories">
                                          <AccordionTrigger>الفئات</AccordionTrigger>
                                          <AccordionContent className="flex flex-col gap-3 mt-1">
                                              <div className="flex flex-col gap-3">
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="all-cat-mobile" />
                                                      <Label htmlFor="all-cat-mobile" className="text-sm font-light">الكل (123)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="courses-cat-mobile" />
                                                      <Label htmlFor="courses-cat-mobile" className="text-sm font-light">دورات (24)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="notes-cat-mobile" />
                                                      <Label htmlFor="notes-cat-mobile" className="text-sm font-light">مذكرات (5)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="camps-cat-mobile" />
                                                      <Label htmlFor="camps-cat-mobile" className="text-sm font-light">معسكرات (12)</Label>
                                                  </div>
                                              </div>
                                          </AccordionContent>
                                      </AccordionItem>

                                      {/* المحتوى */}
                                      <AccordionItem value="content">
                                          <AccordionTrigger>المحتوى</AccordionTrigger>
                                          <AccordionContent className="flex flex-col gap-3 mt-1">
                                              <div className="flex flex-col gap-3">
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="all-content-mobile" />
                                                      <Label htmlFor="all-content-mobile" className="text-sm font-light">الكل (123)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="programming-mobile" />
                                                      <Label htmlFor="programming-mobile" className="text-sm font-light">برمجة التطبيقات (24)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="web-programming-mobile" />
                                                      <Label htmlFor="web-programming-mobile" className="text-sm font-light">برمجة المواقع (9)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="ai-programming-mobile" />
                                                      <Label htmlFor="ai-programming-mobile" className="text-sm font-light">برمجة الذكاء (123)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="data-analysis-mobile" />
                                                      <Label htmlFor="data-analysis-mobile" className="text-sm font-light">تحليل البيانات (9)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="mobile-design-mobile" />
                                                      <Label htmlFor="mobile-design-mobile" className="text-sm font-light">تصميم المواقع (17)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="app-design-mobile" />
                                                      <Label htmlFor="app-design-mobile" className="text-sm font-light">تصميم التطبيقات (24)</Label>
                                                  </div>
                                              </div>
                                          </AccordionContent>
                                      </AccordionItem>

                                      {/* التقييم */}
                                      <AccordionItem value="rating">
                                          <AccordionTrigger>التقييم</AccordionTrigger>
                                          <AccordionContent className="flex flex-col gap-3 mt-1">
                                              <div className="flex flex-col gap-3">
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="rating-5-mobile" />
                                                      <div className="flex items-center gap-2">
                                                          <Rating rating={4.5} />
                                                          <Label htmlFor="rating-5-mobile" className="text-sm font-light">4.5+ (123)</Label>
                                                      </div>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="rating-4-mobile" />
                                                      <div className="flex items-center gap-2">
                                                          <Rating rating={4} />
                                                          <Label htmlFor="rating-4-mobile" className="text-sm font-light">4.0+ (123)</Label>
                                                      </div>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="rating-3-mobile" />
                                                      <div className="flex items-center gap-2">
                                                          <Rating rating={3} />
                                                          <Label htmlFor="rating-3-mobile" className="text-sm font-light">3.5+ (123)</Label>
                                                      </div>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="rating-2-mobile" />
                                                      <div className="flex items-center gap-2">
                                                          <Rating rating={3} />
                                                          <Label htmlFor="rating-2-mobile" className="text-sm font-light">3.0+ (123)</Label>
                                                      </div>
                                                  </div>
                                              </div>
                                          </AccordionContent>
                                      </AccordionItem>

                                      {/* مدة الدورة */}
                                      <AccordionItem value="duration">
                                          <AccordionTrigger>مدة الدورة</AccordionTrigger>
                                          <AccordionContent className="flex flex-col gap-3 mt-1">
                                              <div className="flex flex-col gap-3">
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="duration-1-mobile" />
                                                      <Label htmlFor="duration-1-mobile" className="text-sm font-light">0-1 ساعة (123)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="duration-3-mobile" />
                                                      <Label htmlFor="duration-3-mobile" className="text-sm font-light">1-3 ساعة (123)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="duration-6-mobile" />
                                                      <Label htmlFor="duration-6-mobile" className="text-sm font-light">3-6 ساعة (123)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="duration-17-mobile" />
                                                      <Label htmlFor="duration-17-mobile" className="text-sm font-light">6-17 ساعة (123)</Label>
                                                  </div>
                                              </div>
                                          </AccordionContent>
                                      </AccordionItem>

                                      {/* المستوى */}
                                      <AccordionItem value="level">
                                          <AccordionTrigger>المستوى</AccordionTrigger>
                                          <AccordionContent className="flex flex-col gap-3 mt-1">
                                              <div className="flex flex-col gap-3">
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="beginner-mobile" />
                                                      <Label htmlFor="beginner-mobile" className="text-sm font-light">مبتدئ (123)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="intermediate-mobile" />
                                                      <Label htmlFor="intermediate-mobile" className="text-sm font-light">متوسط (123)</Label>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                      <Checkbox id="advanced-mobile" />
                                                      <Label htmlFor="advanced-mobile" className="text-sm font-light">متقدم (123)</Label>
                                                  </div>
                                              </div>
                                          </AccordionContent>
                                      </AccordionItem>
                                  </Accordion>

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
              </div>
            )}

            {/* Course Grid */}
            <div className="xl:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 place-items-center">
                {/* Repeat course cards 9 times to match the design */}
                {Array.from({ length: 9 }, (_, index) => {
                  const course = coursesData[index % coursesData.length];
                  return (
                        <CourseCard course={course} key={course.id} />
                  );
                })}
              </div>
              
              {/* Pagination */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
                <Pagination className="sm:justify-start">
                  <PaginationContent className="gap-1">
                    <PaginationItem>
                      <PaginationPrevious href="#" className="gap-2" name="السابق"/>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationLink href="#" isActive className="w-10 h-10 bg-primary text-primary-foreground border-primary">
                        1
                      </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationLink href="#"  className="w-10 h-10">
                        2
                      </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationLink href="#" className="w-10 h-10">
                        3
                      </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationLink href="#" className="w-10 h-10">
                        10
                      </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext href="#" className="gap-2" name="التالى"/>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                  <div className="text-sm text-muted-foreground w-full flex justify-center sm:justify-end ">
                      عرض 1 - 20 من 128
                  </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
        <Footer/>
    </section>
  );
};

export default ShopPage;