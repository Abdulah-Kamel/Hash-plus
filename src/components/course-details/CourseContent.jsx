import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
    Play,
    Star,
    CircleCheckBig,
    Lock,
    LockKeyhole,
    BookHeart,
    GraduationCap,
    SquarePlay,
    ChevronDown, StarHalf,
    FileQuestion,
    Radio,
    Link2,
    FileText,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from "next/link";
import { coursesData } from '@/data/coursesData';
import HorizontalCourseCard from "@/components/course-details/HorizontalCourseCard";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import instructorAvatar from "@/assets/courseProfile.png"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// ─── Module type icon mapping ─────────────────────────────────────────────────
const MODULE_ICON = {
  video: Play,
  quiz: FileQuestion,
  task: FileText,
  liveSession: Radio,
  link: Link2,
};

// ─── ModuleRow — single module inside a section ───────────────────────────────
const ModuleRow = ({ module, moduleType, courseId, isBootcamp }) => {
  const Icon = MODULE_ICON[moduleType] || Play;

  // Duration or question count display
  let metaText = "";
  if (moduleType === "liveSession" && module.liveSession) {
    const ls = module.liveSession;
    if (ls.startTime && ls.endTime) metaText = `${ls.startTime} - ${ls.endTime}`;
  } else if (moduleType === "video") {
    const dur = module.video?.duration || module.videoData?.duration;
    if (dur) metaText = `${Math.ceil(dur / 60)} دقيقة`;
  } else if (moduleType === "quiz") {
    const count = module.quiz?.length || module.quizData?.length || 0;
    if (count) metaText = `${count} سؤال`;
  }

  return (
    <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
      {/* Right side: icon + title + badges */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm text-gray-800 truncate">{module.title}</span>
        {module.isFree && (
          <Link
            href={`/course-page/${courseId}`}
            className="text-primary text-xs ms-1 hover:underline flex-shrink-0"
          >
            مشاهدة
          </Link>
        )}
        {isBootcamp && module.liveSession?.meetLink && (
          <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full ms-1 flex-shrink-0">
            بث مباشر
          </span>
        )}
        {isBootcamp && module.projects?.length > 0 && (
          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full ms-1 flex-shrink-0">
            {module.projects.length} مشروع
          </span>
        )}
      </div>

      {/* Left side: meta info + lock icon */}
      <div className="flex items-center gap-2 flex-shrink-0 ms-4">
        {metaText && (
          <span className="text-xs text-muted-foreground">{metaText}</span>
        )}
        {!module.isFree && (
          <LockKeyhole className="w-4 h-4 text-gray-400" />
        )}
      </div>
    </div>
  );
};

const CourseContent = ({ courseDetails, courses }) => {
  return (
    <div className="space-y-6">
      <Card className="px-6">
        <Tabs defaultValue="curriculum" className="w-full" dir={"rtl"}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="curriculum"
              className="data-[state=active]:text-primary"
            >
              محتوى الدورة
            </TabsTrigger>
            <TabsTrigger
              value="instructor"
              className="data-[state=active]:text-primary"
            >
              المعلم
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:text-primary"
            >
              التقييمات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="space-y-6">
            <Card className="border-none shadow-none">
              <CardHeader>
                <h3 className="text-xl font-bold">ماذا سوف تتعلم</h3>
              </CardHeader>
              <CardContent>
                <Card className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 px-5 mt-3">
                  {courseDetails?.learningOutcomes?.map((item) => (
                    <div className="flex justify-start items-center gap-2 text-muted-foreground" key={item}>
                      <CircleCheckBig />
                      {item}
                    </div>
                  ))}
                </Card>
                <div className="mt-6">
                  <h3 className="text-xl font-bold">محتوى الدوره</h3>
                  <p className="text-muted-foreground mt-3">
                    {courseDetails?.sections?.length || 1} قسم .{" "}
                    {courseDetails?.sections?.reduce((acc, s) => acc + (s.modules?.length || 0), 0) || courseDetails?.metadata?.modulesCount || 0} محاضرة .{" "}
                    {courseDetails?.metadata?.duration || 0} ساعة
                  </p>

                  {/* Sections-based accordion */}
                  {courseDetails?.sections?.length > 0 ? (
                    <Accordion
                      type="multiple"
                      className="w-full mt-3 space-y-3"
                      defaultValue={[`section-0`]}
                    >
                      {courseDetails.sections.map((section, sIndex) => (
                        <AccordionItem
                          key={section._id || sIndex}
                          value={`section-${sIndex}`}
                          className="border-2 rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="bg-gray-100 px-6 flex items-center hover:no-underline">
                            <div className="w-full flex items-center justify-between">
                              <span className="font-semibold text-sm">
                                القسم {sIndex + 1} - {section.title}
                              </span>
                              <span className="text-muted-foreground text-xs flex-shrink-0 ms-4">
                                {section.modules?.length || 0} محاضرة
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-0 p-0">
                            {section.modules?.map((module, mIndex) => {
                              const moduleType = module.moduleType || "video";
                              return (
                                <ModuleRow
                                  key={module._id || module.id || mIndex}
                                  module={module}
                                  moduleType={moduleType}
                                  courseId={courseDetails?._id}
                                  isBootcamp={courseDetails?.contentType === "bootcamp"}
                                />
                              );
                            })}
                            {(!section.modules || section.modules.length === 0) && (
                              <div className="px-6 py-4 text-sm text-muted-foreground text-center">
                                لا يوجد محتوى بعد
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : courseDetails?.modules?.length > 0 ? (
                    /* Legacy flat modules fallback */
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full mt-3 border-2 rounded-lg"
                      defaultValue="item-1"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="bg-gray-100 px-6 flex items-center hover:no-underline">
                          <div className="w-full flex items-center justify-between">
                            <span className="font-semibold text-sm">{courseDetails?.title}</span>
                            <span className="text-muted-foreground text-xs flex-shrink-0 ms-4">
                              {courseDetails?.modules?.length} محاضرة
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-0 p-0">
                          {courseDetails.modules.map((module, mIndex) => {
                            const moduleType = module.moduleType || "video";
                            return (
                              <ModuleRow
                                key={module._id || module.id || mIndex}
                                module={module}
                                moduleType={moduleType}
                                courseId={courseDetails?._id}
                                isBootcamp={courseDetails?.contentType === "bootcamp"}
                              />
                            );
                          })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <p className="text-muted-foreground mt-3 text-sm">لا يوجد محتوى بعد</p>
                  )}
                </div>
                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold">متطلبات البدء فى الدورة</h3>
                  <ul className="list-disc list-inside mt-3 space-y-3">
                    {courseDetails?.prerequisites?.map((item) => (
                      <li className="text-muted-foreground" key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg mt-6 w-full flex flex-col gap-6">
                  <h3 className="text-xl font-bold">دورات لها علاقة</h3>
                  {courses?.slice(0, 3).map((course) => (
                    <HorizontalCourseCard
                      key={course._id}
                      course={course}
                      isHorizontal={true}
                    />
                  ))}
                </div>
                <div className="mt-6">
                  <Button
                    variant={"outline"}
                    className="w-full text-secondary border-secondary rounded-full py-5"
                  >
                    عرض المزيد
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructor" className="space-y-6">
            <Card className="border-none shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-primary">
                        {typeof courseDetails?.instructor === 'object' ? courseDetails?.instructor?.name : courseDetails?.instructor}
                      </h3>
                      <p className="text-muted-foreground mt-1">مبرمجه</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-22 h-22 bg-gray-100 mt-2">
                        <Image
                          src={instructorAvatar}
                          alt={"instructor image"}
                          objectFit={"cover"}
                        />
                      </Avatar>
                      <ul className="flex flex-col gap-2">
                        <li className="flex items-center text-muted-foreground gap-2">
                          <Star />
                          <span>4.6 تقييم المعلم</span>
                        </li>
                        <li className="flex items-center text-muted-foreground gap-2">
                          <BookHeart />
                          <span>4.6 تقييم المعلم</span>
                        </li>
                        <li className="flex items-center text-muted-foreground gap-2">
                          <GraduationCap />
                          <span>4.6 تقييم المعلم</span>
                        </li>
                        <li className="flex items-center text-muted-foreground gap-2">
                          <SquarePlay />
                          <span>4.6 تقييم المعلم</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mt-6 text-lg font-bold">عن المعلم</h4>
                      <p>
                        معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات
                        العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة،
                        بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة
                        تعليمية محفزة وتنافسية. معسكرات وبرامج احترافية بالشراكة
                        مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات
                        التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات
                        العملية، ضمن بيئة تعليمية محفزة وتنافسية.
                      </p>
                      <div className="mt-3">
                        <Button
                          variant={"ghost"}
                          className="bg-gray-50 text-secondary hover:text-secondary py-4 px-12"
                        >
                          عرض المزيد
                          <ChevronDown />
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg mt-6 w-full flex flex-col gap-6">
                      <h3 className="text-xl font-bold">دورات لها علاقة</h3>
                      {coursesData.slice(0, 3).map((course) => (
                        <HorizontalCourseCard
                          key={course.id}
                          course={course}
                          isHorizontal={true}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card className="border-none shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">تقييمات الطلاب</h3>
                  <Select dir={"rtl"}>
                    <SelectTrigger className="py-5 px-8 border-gray-800 rounded-full">
                      <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="newest">الاحدث</SelectItem>
                        <SelectItem value="old">الاقدم</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 bg-gray-100">
                        <Image
                          src={instructorAvatar}
                          alt={"instructor image"}
                          objectFit={"cover"}
                        />
                      </Avatar>
                      <h4 className="text-lg font-semibold">محمد على</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground font-light">
                        منذ 3 اسابيع
                      </p>
                      <div className="flex items-center gap-1">
                        <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-3 leading-loose">
                    معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛
                    لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم
                    قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة
                    وتنافسية. معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات
                    العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة،
                    بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة
                    تعليمية محفزة وتنافسية
                    <span
                      role={"button"}
                      className="border-none text-secondary ms-2 cursor-pointer"
                    >
                      عرض المزيد .
                    </span>
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 bg-gray-100">
                        <Image
                          src={instructorAvatar}
                          alt={"instructor image"}
                          objectFit={"cover"}
                        />
                      </Avatar>
                      <h4 className="text-lg font-semibold">محمد على</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground font-light">
                        منذ 3 اسابيع
                      </p>
                      <div className="flex items-center gap-1">
                        <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-3 leading-loose">
                    معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛
                    لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم
                    قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة
                    وتنافسية. معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات
                    العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة،
                    بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة
                    تعليمية محفزة وتنافسية
                    <span
                      role={"button"}
                      className="border-none text-secondary ms-2 cursor-pointer"
                    >
                      عرض المزيد .
                    </span>
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 bg-gray-100">
                        <Image
                          src={instructorAvatar}
                          alt={"instructor image"}
                          objectFit={"cover"}
                        />
                      </Avatar>
                      <h4 className="text-lg font-semibold">محمد على</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground font-light">
                        منذ 3 اسابيع
                      </p>
                      <div className="flex items-center gap-1">
                        <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-3 leading-loose">
                    معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛
                    لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم
                    قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة
                    وتنافسية. معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات
                    العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة،
                    بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة
                    تعليمية محفزة وتنافسية
                    <span
                      role={"button"}
                      className="border-none text-secondary ms-2 cursor-pointer"
                    >
                      عرض المزيد .
                    </span>
                  </p>
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
