import React from "react";
import Container from "@/components/container";
import Image from "next/image";
import courses_arrow from "../../assets/courses_arrow.svg";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  FileText,
  Shield,
  BookOpen,
  Award,
  MapPin,
  Layers,
  ArrowLeft,
} from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      icon: <FileText className="w-12 h-12 text-gray-600" />,
      title: "معسكرات تدريبية مباشرة",
      description:
        "Lorem ipsum dolor sit amet consectetur. Accumsan enim aliquam dolor Lorem ipsum dolor sit amelementum elementum",
    },
    {
      icon: <Shield className="w-12 h-12 text-gray-600" />,
      title: "شروحات مبسطة و سهلة الفهم",
      description:
        "Lorem ipsum dolor sit amet consectetur. Accumsan enim aliquam dolor Lorem ipsum dolor sit amelementum elementum",
    },
    {
      icon: <BookOpen className="w-12 h-12 text-gray-600" />,
      title: "محتوى تعليمي مميز",
      description:
        "Lorem ipsum dolor sit amet consectetur. Accumsan enim aliquam dolor Lorem ipsum dolor sit amelementum elementum",
    },
    {
      icon: <Award className="w-12 h-12 text-gray-600" />,
      title: "شهادات",
      description:
        "Lorem ipsum dolor sit amet consectetur. Accumsan enim aliquam dolor Lorem ipsum dolor sit amelementum elementum",
    },
    {
      icon: <MapPin className="w-12 h-12 text-gray-600" />,
      title: "تعلم من أي مكان",
      description:
        "Lorem ipsum dolor sit amet consectetur. Accumsan enim aliquam dolor Lorem ipsum dolor sit amelementum elementum",
    },
    {
      icon: <Layers className="w-12 h-12 text-gray-600" />,
      title: "طرق تعليم تفاعلية",
      description:
        "Lorem ipsum dolor sit amet consectetur. Accumsan enim aliquam dolor Lorem ipsum dolor sit amelementum elementum",
    },
  ];

  return (
    <section className="">
      <Container>
        <div className="relative w-full bg-[#F1F3FE] lg:p-14 p-6">
          <div className="header">
            <div className="text-right mb-12">
              <Badge
                variant={"secondary"}
                className="bg-primary text-white w-26 h-10 rounded-full text-xl font-medium"
              >
                مميزاتنا
              </Badge>
              <h2 className="text-4xl font-bold tracking-tight leading-normal text-gray-900 sm:text-5xl">
                ما يميز منصتنا
              </h2>
            </div>
            <Image
              src={courses_arrow}
              alt="course svg arrow"
              className="absolute left-0 top-0 w-16 sm:w-24 md:w-32 lg:w-44 xl:w-56 h-auto select-none pointer-events-none"
              width={224}
              height={100}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                dir="rtl"
                className="text-right shadow-lg rounded-2xl border-0 gap-3 p-5"
              >
                <CardHeader className="p-0">
                  <div className="flex justify-start">
                      {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 leading-tight mt-1">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed text-sm text-right">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-medium text-sm hover:bg-primary/5 p-0 h-auto gap-2 hover:gap-3 transition-all"
                  >
                    <span>اكتشف أكثر</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturesGrid;
