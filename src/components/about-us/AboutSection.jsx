import React from "react";
import Image from "next/image";
import Container from "@/components/container";
import GeometricPattern from "@/assets/geometricpattern.svg";
import { Badge } from "../ui/badge";

const AboutSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary/5 via-white to-white">
      <Container className="relative py-20 lg:py-28">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
          <div className="rounded-xl px-4 py-20 bg-gradient-to-t from-primary/70  to-primary flex items-center justify-center gap-4 min-h-[600px]">
            <Image
              src={GeometricPattern}
              alt="Geometric Pattern"
              className="h-25 w-25 object-contain"
            />
            <h1 className="text-2xl sm:text-5xl font-bold text-white">
              هاش بلس
            </h1>
          </div>
          <div
            dir="rtl"
            className="flex flex-col justify-center gap-6 text-right h-full"
          >
            <Badge variant="secondary" className="bg-gray-100 text-primary h-11 w-39 rounded-full font-semibold text-base">
              عن منصتنا
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              عن منصة هاش بلس
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
            معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية. 
            </p>
            <p className="text-lg leading-8 text-muted-foreground">
            معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية. معسكرات وبرامج احترافية بالشراكة مع كبرى الجهات العالمية؛ لتطوير مهاراتك في مجالات التقنيات الحديثة، بمنهجيّة تعلُّم قائمة على التطبيقات العملية، ضمن بيئة تعليمية محفزة وتنافسية.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
