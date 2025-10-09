import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import HeroStats from './HeroStats';

const HeroContent = ({ stats }) => {
  return (
    <div className="w-3/6 max-lg:w-full max-lg:text-center mt-16 max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-24 tracking-tight text-gray-900 md:text-5xl lg:text-6xl rtl:text-right lg:text-right max-lg:text-center">
        <span className="block">أكبر منصة لتعلم</span>
        <span className="block">
          <span className="inline-flex items-center gap-3 rtl:flex-row-reverse">
            {/* Decorative icon */}
            <svg
              className="w-14 h-14 text-teal-400"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <g clipPath="url(#clip0_2011_61166)">
                <path d="M32.76 0H23.24L26.7311 24.9367L11.5668 4.83518L4.83516 11.5668L24.9367 26.7311L0 23.24V32.76L24.9367 29.2689L4.8352 44.4332L11.5669 51.1648L26.7311 31.0633L23.24 56H32.76L29.2689 31.0633L44.4332 51.1648L51.1648 44.4332L31.0633 29.2689L56 32.76V23.24L31.0633 26.7311L51.1648 11.5668L44.4332 4.83518L29.2689 24.9367L32.76 0Z" />
              </g>
              <defs>
                <clipPath id="clip0_2011_61166">
                  <rect width="56" height="56" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="block">بتجربة</span>
            <span className="text-primary">البرمجة</span>
          </span>
        </span>
        <span className="block">بسيطة و سلسلة</span>
      </h1>

      <p className="text-qusecondary leading-8 max-lg:text-center">
        معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك <br />
        في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية،<br />
        ضمن بيئة تعليمية محفزة وتنافسية.
      </p>

      {/* CTA Button */}
      <div className="mt-8 rtl:text-right lg:text-right max-lg:text-center">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30"
        >
          ابدأ الآن
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Stats */}
      <HeroStats stats={stats} />
    </div>
  );
};

export default HeroContent;
