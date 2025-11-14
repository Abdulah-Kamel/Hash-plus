import React from "react";
import creatorRegister from "@/assets/creatorRegister.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function success() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto flex flex-col items-center justify-center gap-10 p-14">
      <Image src={creatorRegister} alt="account under review" />
      <div className="space-y-4 text-center">
        <h2 className="font-semibold text-3xl">سيتم مراجعة ملفك</h2>
        <p className="text-muted-foreground break-after-avoid leading-relaxed">
          سيتم مراجعة الدورة من خلال فريقنا للتأكد من جودة المحتوى الذي تقدمه
          حتى يكون متوافق مع سياستنا و خصوصية المستخدم و التأكد من صحة المعلومات
        </p>
      </div>
      <Link
        href="/creator/index"
        className="w-full rounded-full bg-primary hover:bg-primary/90 py-3 text-center text-white hover:text-white cursor-pointer"
      >
        العودة الى الرئيسية
      </Link>
    </div>
  );
}
