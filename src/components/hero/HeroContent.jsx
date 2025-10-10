import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import HeroStats from './HeroStats';
import { Button } from "@/components/ui/button";

const HeroContent = ({ stats }) => {
  return (
    <div className="w-full lg:w-3/6 text-center lg:text-right mt-16 flex flex-col items-center lg:items-start justify-center">
      <h1 className="mb-4 text-2xl sm:text-4xl xl:text-5xl font-extrabold leading-relaxed tracking-tight text-gray-900 ">
        <span className="block">أكبر منصة لتعلم</span>
        <span className="block">
          <span className="inline-flex items-center gap-3">
            <span className="block">بتجربة</span>
            <span className="text-primary">البرمجة</span>
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
          </span>
        </span>
        <span className="block">بسيطة و سلسلة</span>
      </h1>

      <p className="text-muted-foreground leading-8 max-w-2xl mx-auto lg:mx-0">
        معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك
        في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية،
        ضمن بيئة تعليمية محفزة وتنافسية.
      </p>

      {/* CTA Button */}
      <div className="mt-8">
        <Button asChild size="lg" className="rounded-full">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2"
          >
            ابدأ الآن
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <HeroStats stats={stats} />
    </div>
  );
};

export default HeroContent;
