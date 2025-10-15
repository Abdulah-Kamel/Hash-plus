import React from 'react';
import {NavBar} from '@/components/navbar';
import Footer from '@/components/footer';
import Container from '@/components/container';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Star, Clock, BookOpenText, SaudiRiyal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import courseImage from '@/assets/course1.png';
import instructorAvatar from '@/assets/courseProfile.png';
import {CourseCard} from "@/components/courses";

const TeacherPage = () => {
    // Mock teacher data
    const teacher = {
        id: 1,
        name: 'ولاء القحطاني',
        role: 'مبرمجة',
        avatar: instructorAvatar,
        rating: 4.6,
        totalRatings: 83,
        studentsCount: 12,
        coursesCount: 120,
        description: 'معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية. معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية.'
    };

    // Mock courses data
    const courses = [
        {
            id: 1,
            title: 'مذكرات JavaScript',
            instructor: 'ولاء القحطاني',
            rating: 4.5,
            reviews: 625,
            duration: '40 ساعة',
            lessons: '40',
            price: '50',
            image: courseImage,
            type: 'أفضل تقييم'
        },
        {
            id: 2,
            title: 'مذكرات JavaScript',
            instructor: 'ولاء القحطاني',
            rating: 4.5,
            reviews: 625,
            duration: '40 ساعة',
            lessons: '40',
            price: '50',
            image: courseImage,
            type: 'أفضل تقييم'
        },
        {
            id: 3,
            title: 'مذكرات JavaScript',
            instructor: 'ولاء القحطاني',
            rating: 4.5,
            reviews: 625,
            duration: '40 ساعة',
            lessons: '40',
            price: '50',
            image: courseImage,
            type: 'أفضل تقييم'
        }
    ];

    const filterTabs = ['الكل', 'دورات', 'مذكرات', 'معسكرات'];

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            
            {/* Hero Section with Purple Background */}
            <section className="">
                <div className="w-full h-23 bg-primary">
                </div>
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start py-6">
                        {/* About Teacher Section */}
                        <div className="lg:col-span-3 space-y-6 max-lg:order-2">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">عن المعلم</h2>
                                <p className="text-lg leading-relaxed text-muted-foreground">
                                    {teacher.description}
                                </p>
                            </div>
                            <div className="space-y-8">
                                {/* Section Title and Filter Tabs */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-900">تعليم</h2>

                                    {/* Filter Tabs */}
                                    <div className="flex flex-wrap gap-3">
                                        {filterTabs.map((tab, index) => (
                                            <Button
                                                key={tab}
                                                variant={index === 0 ? "default" : "outline"}
                                                className={`rounded-full px-6 py-2 ${
                                                    index === 0
                                                        ? 'bg-primary text-white'
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                {tab}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Courses Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                                    {courses.map((course) => (
                                        <CourseCard course={course} key={course.id} />
                                    ))}
                                </div>

                                {/* Show More Button */}
                                <div className="text-center pt-8">
                                    <Button variant="outline" className="rounded-full px-8 py-3 border-secondary text-secondary hover:bg-secondary hover:text-white w-full">
                                        عرض المزيد
                                    </Button>
                                </div>
                            </div>

                        </div>
                        {/* Teacher Info Card */}
                        <div className="lg:col-span-1 -translate-y-1/6 max-lg:order-1">
                            <Card className="bg-white rounded-3xl shadow-lg p-6">
                                <CardContent className="text-center space-y-4">
                                    {/* Avatar */}
                                    <div className="flex justify-center">
                                        <Avatar className="w-24 h-24">
                                            <Image src={teacher.avatar} alt={teacher.name} className="w-full h-full object-cover rounded-full bg-gray-100"/>
                                            <AvatarFallback>و</AvatarFallback>
                                        </Avatar>
                                    </div>

                                    {/* Name and Role */}
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">{teacher.name}</h1>
                                        <p className="text-gray-600">{teacher.role}</p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-300">
                                        <div className="text-start">
                                            <div className="text-sm text-gray-600">اجمالي التقييم</div>
                                            <div className="text-lg font-semibold">{teacher.totalRatings}</div>
                                        </div>
                                        <div className="text-start">
                                            <div className="text-sm text-gray-600">تقييم المعلم</div>
                                            <div className="text-lg font-semibold">{teacher.rating}</div>
                                        </div>
                                        <div className="text-start">
                                            <div className="text-sm text-gray-600">عدد المحتوى</div>
                                            <div className="text-lg font-semibold">{teacher.studentsCount}</div>
                                        </div>
                                        <div className="text-start">
                                            <div className="text-sm text-gray-600">عدد الطلاب</div>
                                            <div className="text-lg font-semibold">{teacher.coursesCount}</div>
                                        </div>
                                    </div>

                                    {/* Follow Button */}
                                    <Button variant="outline" className="w-full rounded-full border-2 border-primary transition-colors text-primary group hover:bg-primary hover:text-white">
                                        متابعة
                                        <Heart className="size-6 text-primary group-hover:text-white transition-colors" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Container>
            </section>
            <Footer />
        </div>
    );
};

export default TeacherPage;