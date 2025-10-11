import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const RelatedCourses = () => {
  const relatedCourses = [
    {
      id: 1,
      title: 'مذكرات JavaScript',
      instructor: 'ولاء القحطاني',
      rating: 4.8,
      reviews: 1234,
      price: 50,
      originalPrice: 80,
      students: 12345,
      duration: '30 ساعة',
      image: '/course-thumbnail.jpg',
      badge: 'الأكثر مبيعاً',
      badgeColor: 'bg-green-500'
    },
    {
      id: 2,
      title: 'مذكرات JavaScript',
      instructor: 'ولاء القحطاني',
      rating: 4.6,
      reviews: 987,
      price: 50,
      originalPrice: 80,
      students: 8765,
      duration: '25 ساعة',
      image: '/course-thumbnail.jpg',
      badge: 'الأكثر تقييماً',
      badgeColor: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'مذكرات JavaScript',
      instructor: 'ولاء القحطاني',
      rating: 4.7,
      reviews: 654,
      price: 50,
      originalPrice: 80,
      students: 5432,
      duration: '28 ساعة',
      image: '/course-thumbnail.jpg',
      badge: 'جديد',
      badgeColor: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">دورات ذات صلة</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedCourses.map((course) => (
          <Link key={course.id} href={`/course/${course.id}`}>
            <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="relative">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Badge */}
                <Badge 
                  className={`absolute top-3 right-3 text-white ${course.badgeColor} hover:${course.badgeColor}`}
                >
                  {course.badge}
                </Badge>
                
                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {course.duration}
                </div>
              </div>
              
              <CardContent className="p-4 space-y-3">
                {/* Title */}
                <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                
                {/* Instructor */}
                <p className="text-gray-600 text-sm">
                  {course.instructor}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-sm">{course.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({course.reviews.toLocaleString()})</span>
                </div>
                
                {/* Students */}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()} طالب</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xl font-bold text-primary">{course.price} ريال</span>
                  <span className="text-gray-500 line-through text-sm">{course.originalPrice} ريال</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
