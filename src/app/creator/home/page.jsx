"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import celebratehands from "@/assets/celebratehands.svg";
import creator_acount_active from "@/assets/creator_acount_active.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatorTopBar from "@/components/creator/CreatorTopBar";
import { useAuth } from "@/hooks/useAuth";
import { getAllContents } from "@/actions/contentActions";
import CreatorContentCard from "@/components/creator/CreatorContentCard";
import CreatorDashboard from "@/components/creator/CreatorDashboard";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchMyContents = async () => {
      const userId = user?._id || user?.id;
      if (!userId) {
        setIsLoading(false);
        return;
      }
      
      const res = await getAllContents();
      if (res.success) {
        const list = res.data?.data?.contents || res.data?.data || res.data || [];
        
        // Filter the requested contents locally inside the browser
        const filteredList = Array.isArray(list) 
          ? list.filter(c => 
              (c.instructor === userId || 
              c.instructor?._id === userId || 
              c.instructor?.id === userId) && 
              c.contentType === "bootcamp"
            )
          : [];
          
        setContents(filteredList);
      }
      setIsLoading(false);
    };

    if (!authLoading) {
      if (!user) {
        router.push("/auth/login");
        return;
      }
      if (user?.status === "pending") {
         setIsVerified(true);
      }
      fetchMyContents();
    }
  }, [user, authLoading, router]);

  return (
    <>
      <CreatorTopBar />
      <div className="mt-8 px-4 lg:px-8">
        {isLoading || authLoading ? (
          <div className="flex items-center justify-center p-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : isVerified ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-6 p-12">
              <Image
                src={celebratehands}
                alt="welcome"
                width={300}
                height={300}
              />
              <p className="text-center text-3xl font-bold">لقد تم ارسال ملفك للمراجعة</p>
              <p className="text-center text-lg text-gray-500">
                سيتم مراجعة ملفك في خلال 48 ساعة
              </p>
            </CardContent>
          </Card>
        ) : contents.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-6 p-12">
              <Image
                src={creator_acount_active}
                alt="welcome"
                width={300}
                height={300}
              />
              <p className="text-center text-3xl font-bold">حسابك مفعل الاَن</p>
              <p className="text-center text-lg text-gray-500">
                أنت الاَن جاهز لإنشاء المحتوى و متابعة الإحصائيات
              </p>
              <Link href="/creator/onbording">
                <Button className="px-8 py-6 rounded-full text-lg mt-4 bg-primary text-white hover:bg-primary/90">
                  انشاء معسكر
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <CreatorDashboard />
        )}
      </div>
    </>
  );
};

export default page;
