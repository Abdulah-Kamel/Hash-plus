import React from "react";
import Container from "@/components/container";
import { Badge } from "../ui/badge";
import windIcon from "@/assets/course_icon2.svg";
import Image from "next/image";
const VisionMission = () => {
  const missionItems = [
    "محتوى تعليمي شامل",
    "مجتمع داعم ومتفاعل",
    "مسارات تعليمية مخصصة",
    "شهادات معتمدة",
  ];

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-8 lg:gap-12">
          <div className="col-span-1 gap-4 flex flex-col ">
            <Badge className="bg-gray-100 text-primary h-11 w-39 rounded-full font-semibold text-base">
              رؤيتنا ومهمتنا
            </Badge>
            <h2 className="font-semibold text-3xl lg:text-6xl leading-normal lg:leading-20">
              تعرف على هدفنا و مهمتنا تجاه المجتمع
            </h2>
            <Image
              src={windIcon}
              alt="decoration wind icon"
              className="w-34 h-34"
            />
          </div>
          <div className="col-span-2 gap-4 flex flex-col">
            <div className="border-b pb-8">
              <span className="text-secondary font-normal text-2xl">
                رؤيتنا
              </span>
              <p className="text-muted-foreground leading-7 mt-4">
                لقد تعلمت كثيرا من خلال رحلتي في هذا الموقع لكي أصبح مبرمجا,
                كانت رحلة مليئة بطرق التعلم المميزة و المختلفة و التفاعلية التي
                جعلتني استفيد جدا, و كان المعلمون رائعين , فقد كانوا مساندين لي
                في كل شيء احتجته صراحة أرشح هذا الموقع لجميع أصدقائي لقد تعلمت
                كثيرا من خلال رحلتي في هذا الموقع لكي أصبح مبرمجا, كانت رحلة
                مليئة بطرق التعلم المميزة و المختلفة و التفاعلية التي جعلتني
                استفيد جدا, و كان المعلمون رائعين , فقد كانوا مساندين لي في كل
                شيء احتجته صراحة أرشح هذا الموقع لجميع أصدقائي
              </p>
            </div>
            <div >
              <span className="text-secondary font-normal text-2xl">
                مهمتنا
              </span>
              <ul className="font-normal text-lg mt-4">
                <li className="border-b py-5">انشاء جيل متعلم</li>
                <li className="border-b py-5">تعليم جميع الأعمار </li>
                <li className="border-b py-5">ارتقاء بمستوى التعليم</li>
                <li className="border-b py-5">انشاء مجتمع صحي و متعلم</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VisionMission;
