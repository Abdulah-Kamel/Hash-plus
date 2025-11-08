"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllCategories } from './CourseActions';

const CourseTabs = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      if (res.success) {
        console.log(res.data);
        setCategories(res.data.data);
      } else {
        console.log(res.error);
      }
    }
    fetchCategories();
  }, []);
  console.log(categories);
  return (
    <ul className="flex mt-5 gap-4 flex-wrap text-sm font-medium text-center text-gray-500">
      <li className="me-2">
        <Link
          href="#"
          className="inline-block px-7 py-4 text-white bg-primary rounded-full active"
          aria-current="page"
        >
          كل المنتجات
        </Link>
      </li>
      <li className="me-2">
        <Link
          href="#"
          className="inline-block px-7 py-4 rounded-full hover:text-white bg-white hover:bg-primary transition-colors"
        >
          الدورات
        </Link>
      </li>
      <li className="me-2">
        <Link
          href="#"
          className="inline-block px-7 py-4 rounded-full hover:text-white bg-white hover:bg-primary transition-colors"
        >
          المذكرات
        </Link>
      </li>
      <li className="me-2">
        <Link
          href="#"
          className="inline-block px-7 py-4 rounded-full hover:text-white bg-white hover:bg-primary transition-colors"
        >
          المعسكرات
        </Link>
      </li>
      <li className="ms-auto">
        <Link
          href="/courses"
          className="inline-block px-7 py-4 rounded-full hover:text-white bg-white hover:bg-primary transition-colors"
        >
          عرض الكل
          <ArrowLeft className="inline-flex h-5 w-5 ms-2" />
        </Link>
      </li>
    </ul>
  );
};

export default CourseTabs;
