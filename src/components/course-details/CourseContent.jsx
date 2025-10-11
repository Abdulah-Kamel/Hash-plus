import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {Play, Star, CircleCheckBig, Lock, LockKeyhole} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from "next/link";
import { coursesData } from '@/data/coursesData';
import HorizontalCourseCard from "@/components/course-details/HorizontalCourseCard";
import {Button} from "@/components/ui/button";
const CourseContent = () => {
  return (
    <div className="space-y-6">
        <Card className="px-6">
      <Tabs defaultValue="curriculum" className="w-full" dir={"rtl"}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="curriculum" className="data-[state=active]:text-primary">محتوى الدورة</TabsTrigger>
          <TabsTrigger value="instructor" className="data-[state=active]:text-primary">المعلم</TabsTrigger>
          <TabsTrigger value="reviews" className="data-[state=active]:text-primary">التقييمات</TabsTrigger>
        </TabsList>

        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-6">
          <Card className="border-none shadow-none">
            <CardHeader>
              <h3 className="text-xl font-bold">ماذا سوف تتعلم</h3>
            </CardHeader>
            <CardContent>
                <Card className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 px-5 mt-3">
                <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <CircleCheckBig />
                    محتوى تقنى ممتاز
                </div>
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <CircleCheckBig />
                    محتوى تقنى ممتاز
                </div>
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <CircleCheckBig />
                    محتوى تقنى ممتاز
                </div>
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <CircleCheckBig />
                    محتوى تقنى ممتاز
                </div>
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <CircleCheckBig />
                    محتوى تقنى ممتاز
                </div>
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <CircleCheckBig />
                    محتوى تقنى ممتاز
                </div>
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <CircleCheckBig />
                    محتوى تقنى ممتاز
                </div>
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <CircleCheckBig />
                    محتوى تقنى ممتاز
                </div>
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                    <CircleCheckBig />
                    محتوى تقنى ممتاز
                </div>
                </Card>
                <div className="mt-6">
                    <h3 className="text-xl font-bold">محتوى الدوره</h3>
                    <p className="text-muted-foreground mt-3">
                        12 قسم . 64 محاضرة . 11 ساعة
                    </p>
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full mt-3 border-2 rounded-lg"
                        defaultValue="item-1"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="bg-gray-100 px-6 flex items-center first:rounded-b-none last:rounded-t-none hover:no-underline">
                                <div className="w-full flex items-center justify-between">
                                    <span>
                                بداية الدورة
                                    </span>
                                    <span>
                                        6 محاضرة . 22 دقيقة
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-6 text-balance p-4">
                               <div className="flex justify-between items-center">
                                   <div className="flex items-center gap-1">
                                       <Play className="text-white bg-secondary p-1 rounded-full w-8 h-8"/>
                                       <span>محتوى تقنى متميز</span>
                                       <Link href={"/watch"} className="text-primary ms-3 hover:underline hover:text-primary/80">مشاهدة</Link>
                                   </div>
                                   <div className="flex items-center gap-1">
                                       <span className="text-muted-foreground">2:35</span>
                                   </div>
                               </div>
                                <div className="flex justify-between items-center">
                                   <div className="flex items-center gap-1">
                                       <LockKeyhole className="p-1 rounded-full w-8 h-8"/>
                                       <span>محتوى تقنى متميز</span>
                                       <Link href={"/watch"} className="text-primary ms-3 hover:underline hover:text-primary/80">مشاهدة</Link>
                                   </div>
                                   <div className="flex items-center gap-1">
                                       <span className="text-muted-foreground">2:35</span>
                                   </div>
                               </div>
                                <div className="flex justify-between items-center">
                                   <div className="flex items-center gap-1">
                                       <LockKeyhole className="p-1 rounded-full w-8 h-8"/>
                                       <span>محتوى تقنى متميز</span>
                                       <Link href={"/watch"} className="text-primary ms-3 hover:underline hover:text-primary/80">مشاهدة</Link>
                                   </div>
                                   <div className="flex items-center gap-1">
                                       <span className="text-muted-foreground">2:35</span>
                                   </div>
                               </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="bg-gray-100 px-6 flex items-center first:rounded-b-none last:rounded-t-none hover:no-underline">
                                <div className="w-full flex items-center justify-between">
                                    <span>
                                بداية الدورة
                                    </span>
                                    <span>
                                        6 محاضرة . 22 دقيقة
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-6 text-balance p-4">
                               <div className="flex justify-between items-center">
                                   <div className="flex items-center gap-1">
                                       <Play className="text-white bg-secondary p-1 rounded-full w-8 h-8"/>
                                       <span>محتوى تقنى متميز</span>
                                       <Link href={"/watch"} className="text-primary ms-3 hover:underline hover:text-primary/80">مشاهدة</Link>
                                   </div>
                                   <div className="flex items-center gap-1">
                                       <span className="text-muted-foreground">2:35</span>
                                   </div>
                               </div>
                                <div className="flex justify-between items-center">
                                   <div className="flex items-center gap-1">
                                       <LockKeyhole className="p-1 rounded-full w-8 h-8"/>
                                       <span>محتوى تقنى متميز</span>
                                       <Link href={"/watch"} className="text-primary ms-3 hover:underline hover:text-primary/80">مشاهدة</Link>
                                   </div>
                                   <div className="flex items-center gap-1">
                                       <span className="text-muted-foreground">2:35</span>
                                   </div>
                               </div>
                                <div className="flex justify-between items-center">
                                   <div className="flex items-center gap-1">
                                       <LockKeyhole className="p-1 rounded-full w-8 h-8"/>
                                       <span>محتوى تقنى متميز</span>
                                       <Link href={"/watch"} className="text-primary ms-3 hover:underline hover:text-primary/80">مشاهدة</Link>
                                   </div>
                                   <div className="flex items-center gap-1">
                                       <span className="text-muted-foreground">2:35</span>
                                   </div>
                               </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="bg-gray-100 px-6 flex items-center first:rounded-b-none last:rounded-t-none hover:no-underline">
                                <div className="w-full flex items-center justify-between">
                                    <span>
                                بداية الدورة
                                    </span>
                                    <span>
                                        6 محاضرة . 22 دقيقة
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-6 text-balance p-4">
                               <div className="flex justify-between items-center">
                                   <div className="flex items-center gap-1">
                                       <Play className="text-white bg-secondary p-1 rounded-full w-8 h-8"/>
                                       <span>محتوى تقنى متميز</span>
                                       <Link href={"/watch"} className="text-primary ms-3 hover:underline hover:text-primary/80">مشاهدة</Link>
                                   </div>
                                   <div className="flex items-center gap-1">
                                       <span className="text-muted-foreground">2:35</span>
                                   </div>
                               </div>
                                <div className="flex justify-between items-center">
                                   <div className="flex items-center gap-1">
                                       <LockKeyhole className="p-1 rounded-full w-8 h-8"/>
                                       <span>محتوى تقنى متميز</span>
                                       <Link href={"/watch"} className="text-primary ms-3 hover:underline hover:text-primary/80">مشاهدة</Link>
                                   </div>
                                   <div className="flex items-center gap-1">
                                       <span className="text-muted-foreground">2:35</span>
                                   </div>
                               </div>
                                <div className="flex justify-between items-center">
                                   <div className="flex items-center gap-1">
                                       <LockKeyhole className="p-1 rounded-full w-8 h-8"/>
                                       <span>محتوى تقنى متميز</span>
                                       <Link href={"/watch"} className="text-primary ms-3 hover:underline hover:text-primary/80">مشاهدة</Link>
                                   </div>
                                   <div className="flex items-center gap-1">
                                       <span className="text-muted-foreground">2:35</span>
                                   </div>
                               </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold">متطلبات البدء فى الدورة</h3>
                    <ul className="list-disc list-inside mt-3 space-y-3">
                        <li className="text-muted-foreground">
                           معرفه جيدة باللغة العربيه والانجليزية
                        </li>
                        <li className="text-muted-foreground">
                           معرفه جيدة باللغة العربيه والانجليزية
                        </li>
                        <li className="text-muted-foreground">
                           معرفه جيدة باللغة العربيه والانجليزية
                        </li>
                        <li className="text-muted-foreground">
                           معرفه جيدة باللغة العربيه والانجليزية
                        </li>
                        <li className="text-muted-foreground">
                           معرفه جيدة باللغة العربيه والانجليزية
                        </li>
                        <li className="text-muted-foreground">
                           معرفه جيدة باللغة العربيه والانجليزية
                        </li>
                    </ul>
                </div>
                <div className="rounded-lg mt-6 w-full flex flex-col gap-6">
                    <h3 className="text-xl font-bold">دورات لها علاقة</h3>
                    {
                        coursesData.slice(0,3).map((course)=>(
                            <HorizontalCourseCard key={course.id} course={course} isHorizontal={true}/>
                        ))
                    }
                </div>
                <div className="mt-6">
                    <Button variant={"outline"} className="w-full text-secondary border-secondary rounded-full py-5">
                    عرض المزيد
                    </Button>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instructor Tab */}
        <TabsContent value="instructor" className="space-y-6">
          <Card className="border-none shadow-none">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-2xl bg-primary text-white">و</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">ولاء القحطاني</h3>
                    <p className="text-gray-600">مطور Full Stack ومدرب معتمد</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">4.8</div>
                      <div className="text-sm text-gray-600">تقييم المدرب</div>
                    </div>
                    
                    <div>
                      <div className="text-2xl font-bold text-primary">1,234</div>
                      <div className="text-sm text-gray-600">تقييم</div>
                    </div>
                    
                    <div>
                      <div className="text-2xl font-bold text-primary">12,345</div>
                      <div className="text-sm text-gray-600">طالب</div>
                    </div>
                    
                    <div>
                      <div className="text-2xl font-bold text-primary">15</div>
                      <div className="text-sm text-gray-600">دورة</div>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700">
                      مطور ويب متخصص مع أكثر من 8 سنوات من الخبرة في تطوير التطبيقات. 
                      حاصل على شهادات متعددة في تقنيات الويب الحديثة ولديه شغف كبير لتعليم البرمجة.
                    </p>
                    
                    <p className="text-gray-700">
                      عمل مع شركات تقنية رائدة وساهم في تطوير العديد من المشاريع الناجحة. 
                      يؤمن بأن التعلم العملي هو أفضل طريقة لإتقان البرمجة.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card className="border-none shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">تقييمات الطلاب</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold">4.8</span>
                  <span className="text-gray-600">(1,234 تقييم)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Review Item */}
              <div className="border-b pb-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>أ</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">أحمد محمد</h4>
                      <span className="text-sm text-gray-500">منذ أسبوع</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700">
                      دورة ممتازة جداً! المحتوى واضح ومفصل والمدرب يشرح بطريقة سهلة ومفهومة. 
                      استفدت كثيراً من المشاريع العملية.
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Item */}
              <div className="border-b pb-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>س</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">سارة أحمد</h4>
                      <span className="text-sm text-gray-500">منذ أسبوعين</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700">
                      أنصح بهذه الدورة لكل من يريد تعلم JavaScript. المحتوى منظم بشكل ممتاز 
                      والتمارين العملية تساعد على فهم المفاهيم بشكل أفضل.
                    </p>
                  </div>
                </div>
              </div>

              {/* Review Item */}
              <div>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>م</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">محمد علي</h4>
                      <span className="text-sm text-gray-500">منذ شهر</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    
                    <p className="text-gray-700">
                      دورة جيدة جداً للمبتدئين. المدرب محترف ويجيب على جميع الأسئلة. 
                      أتمنى لو كان هناك المزيد من المشاريع المتقدمة.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        </Card>

    </div>
  );
};

export default CourseContent;
