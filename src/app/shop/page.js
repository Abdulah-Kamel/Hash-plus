'use client';
import React, { useState } from 'react';
import Container from '@/components/container';
import {
  ShopHero,
  ShopHeader,
  DesktopSidebar,
  MobileSidebar,
  CourseGrid,
} from '@/components/shop';
import CustomPagination from "@/components/shared/CustomPagination";

const ShopPage = () => {
  const [selectedSort, setSelectedSort] = useState('الأحدث');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="min-h-screen bg-primary">
      <ShopHero />
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

            <CourseGrid />
          </div>
          <CustomPagination />
        </Container>
      </div>
    </section>
  );
};

export default ShopPage;