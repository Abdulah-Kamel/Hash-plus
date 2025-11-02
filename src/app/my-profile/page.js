"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Share2,
  Edit,
  Plus,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  Award,
  BookOpen,
  Briefcase,
  Music2,
  PenSquare,
  Facebook,
  Instagram,
  Music,
  TwitterIcon,
  Twitter,
  LucideLinkedin,
  Youtube,
  Dribbble,
  Heart,
  Share,
} from "lucide-react";
import Container from "@/components/container";
import { NavBar } from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import MyProfileHeader from "@/components/my-profile/MyProfileHeader";

const MyProfile = () => {
  const [currentProjectPage, setCurrentProjectPage] = useState(1);

  // Mock data - replace with real data
  const profileData = {
    name: "محمد علي",
    title: "مصمم جرافيك",
    avatar: "/api/placeholder/150/150",
    completionPercentage: 80,
    socialLinks: [
      { platform: "facebook", url: "#" },
      { platform: "twitter", url: "#" },
      { platform: "instagram", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "github", url: "#" },
      { platform: "dribbble", url: "#" },
      { platform: "behance", url: "#" },
      { platform: "youtube", url: "#" },
    ],
    bio: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسماً ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممى المواقع على وجه الخصوص، حيث يحتاج المصمم فى كثير من الأحيان إلى نص وهمى يضعه فى التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص هنا أن يوفر للمصمم نصاً بديلاً لا يشغل القارئ عن التركيز على الشكل الخارجى للنص أو طريقة توزيع الفقرات والأسطر داخل الصفحة.",
    languages: [
      { name: "العربية", level: "اللغة الأم" },
      { name: "الانجليزية", level: "متوسط" },
    ],
    education: {
      degree: "جامعة الملك فهد",
      field: "كلية علوم الحاسوب وتقنية المعلومات",
      period: "2019 - 2024",
    },
    skills: [
      "Adobe Photoshop",
      "Adobe Photoshop",
      "Adobe XD",
      "Adobe XD",
      "Lovart",
      "Figma",
      "Miro",
    ],
  };

  const projects = [
    {
      id: 1,
      title: "مشروع Hash Plus",
      image: "/api/placeholder/300/200",
      description: "وصف المشروع هنا",
    },
    {
      id: 2,
      title: "مشروع Hash Plus",
      image: "/api/placeholder/300/200",
      description: "وصف المشروع هنا",
    },
    {
      id: 3,
      title: "مشروع Hash Plus",
      image: "/api/placeholder/300/200",
      description: "وصف المشروع هنا",
    },
  ];

  const experiences = [
    {
      id: 1,
      company: "Incooders",
      position: "Senior Graphic Designer",
      period: "20/05/2021 - 01/08/2024",
      location: "الرياض، السعودية - من الموقع",
      description:
        "هذا النص هو مثال لنص يمكن أن يولد مثل هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسماً ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممى المواقع على وجه الخصوص، حيث يحتاج المصمم فى كثير من الأحيان إلى نص وهمى يضعه فى التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص هنا أن يوفر للمصمم نصاً بديلاً.",
      skills: [
        "Adobe Photoshop",
        "Adobe Photoshop",
        "Adobe XD",
        "Adobe XD",
        "Lovart",
        "Figma",
        "Miro",
      ],
    },
    {
      id: 2,
      company: "Vertex",
      position: "Art Director",
      period: "1 سنة و 3 شهر • 01/08/2024",
      location: "حى الملز، الرياض • 01/08/2024 - من الموقع",
      description:
        "هذا النص هو مثال لنص يمكن أن يولد مثل هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
    },
  ];

  const certificates = [
    {
      id: 1,
      title: "Google Graphic Design Certificate",
      issuer: "Google",
      date: "2020 سبتمبر",
      credential: "الاعتماد",
      image: "/api/placeholder/100/100",
      description:
        "هذا النص هو مثال لنص يمكن أن يولد مثل هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف كما تريد",
    },
  ];

  return (
    <>
      <NavBar />
      <Container>
        <section className="py-12">
          <MyProfileHeader />
          <Card></Card>
        </section>
      </Container>
      <Footer />
    </>
  );
};

export default MyProfile;
