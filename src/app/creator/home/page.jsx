"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import celebratehands from "@/assets/celebratehands.svg";
import creator_acount_active from "@/assets/creator_acount_active.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatorTopBar from "@/components/creator/CreatorTopBar";
const page = () => {
  const [isVerified, setIsVerified] = useState(false);
  return (
    <>
      <CreatorTopBar />
      <div className="mt-8">
        {isVerified ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-4 p-4">
              <Image
                src={celebratehands}
                alt="welcome"
                width={300}
                height={300}
              />
              <p className="text-center text-2xl">لقد تم ارسال ملفك للمراجعة</p>
              <p className="text-center text-base text-gray-500 mt-4">
                سيتم مراجعة ملفك في خلال 48 ساعة
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-4 p-4">
              <Image
                src={creator_acount_active}
                alt="welcome"
                width={300}
                height={300}
              />
              <p className="text-center text-2xl">حسابك مفعل الاَن</p>
              <p className="text-center text-base text-gray-500 mt-4">
                أنت الاَن جاهز لإنشاء المحتوى و متابعة الإحصائيات
              </p>
              <Link
                href="/creator/onbording"
                className="bg-primary text-white p-6 rounded-full "
              >
                انشاء محتوى
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default page;
