"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllContents } from '@/actions/contentActions';

const contentTypeLabels = {
  course: "كورسات",
  bootcamp: "معسكرات",
};

const CourseTabs = () => {
  const [contentTypes, setContentTypes] = useState([]);
  useEffect(() => {
    const fetchContents = async () => {
      const res = await getAllContents();
      if (res.success) {
        // Extract unique content types from the data
        const types = [...new Set((res.data.data || []).map((item) => item.contentType))];
        setContentTypes(types);
      } else {
        console.log(res.error);
      }
    }
    fetchContents();
  }, []);

  return (
    <ul className="flex mt-5 gap-4 flex-wrap text-sm font-medium text-center text-gray-500">
      <li className="me-2">
        <Link
          href="#"
          className="inline-block px-7 py-4 text-white bg-primary rounded-full active"
          aria-current="page"
        >
          كل المحتوى
        </Link>
      </li>
      {contentTypes.map((type) => (
        <li className="me-2" key={type}>
          <Link
            href={`#${type}`}
            className="inline-block px-7 py-4 rounded-full hover:text-white bg-white hover:bg-primary transition-colors"
          >
            {contentTypeLabels[type] || type}
          </Link>
        </li>
      ))}
      <li className="ms-auto">
        <Link
          href="/shop"
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
