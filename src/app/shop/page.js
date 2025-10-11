'use client';
import React, { useState } from 'react';
import Container from '@/components/container';
import { NavBar } from "@/components/navbar";
import Footer from "@/components/footer";
import courseImage from "@/assets/course1.png";
import {
  ShopHero,
  ShopHeader,
  DesktopSidebar,
  MobileSidebar,
  CourseGrid,
  ShopPagination
} from '@/components/shop';

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
      <NavBar />
      <ShopHero />

      {/* Main Content */}
      <div className="bg-white">
        <Container className="py-8">
          <ShopHeader 
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="flex flex-col xl:flex-row gap-8">
            <DesktopSidebar />

            <MobileSidebar 
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />

            <CourseGrid courses={coursesData} />
          </div>
            <ShopPagination />
        </Container>
      </div>
        <Footer/>
    </section>
  );
};

export default ShopPage;