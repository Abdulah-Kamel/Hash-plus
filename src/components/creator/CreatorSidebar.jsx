"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Users,
  FileText,
  Video,
  BarChart3,
  MessageSquare,
  Star,
  DollarSign,
  Calendar,
  Bell,
  User,
  LogOut,
  Plus,
  Home,
  GraduationCap,
  BookHeart,
  Award,
  TrendingUp,
  HomeIcon,
  GraduationCapIcon,
  Book,
  StarIcon,
  ChartColumnBig,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Link from "next/link";
// This is sample data for the creator dashboard
const data = [
  {
    title: "الرئيسية",
    url: "/creator/home",
    icon: Home,
    isActive: true,
  },
  {
    title: "المعسكرات",
    url: "/creator/courses",
    icon: Book,
    items: [
      {
        title: "جميع المعسكرات",
        url: "/creator/courses",
      },
      {
        title: "إنشاء معسكر جديد",
        url: "/creator/courses/new",
      },
      {
        title: "المسودات",
        url: "/creator/courses/drafts",
      },
      {
        title: "المنشورة",
        url: "/creator/courses/published",
      },
    ],
  },
  // {
  //   title: "الطلاب",
  //   url: "/creator/students",
  //   icon: GraduationCapIcon,
  //   items: [
  //     {
  //       title: "جميع الطلاب",
  //       url: "/creator/students",
  //     },
  //     {
  //       title: "التقييمات",
  //       url: "/creator/students/reviews",
  //     },
  //     {
  //       title: "الرسائل",
  //       url: "/creator/students/messages",
  //     },
  //   ],
  // },
  // {
  //   title: "المراجعات",
  //   url: "/creator/analytics",
  //   icon: StarIcon,
  //   items: [
  //     {
  //       title: "نظرة عامة",
  //       url: "/creator/analytics",
  //     },
  //     {
  //       title: "المبيعات",
  //       url: "/creator/analytics/sales",
  //     },
  //     {
  //       title: "الأداء",
  //       url: "/creator/analytics/performance",
  //     },
  //     {
  //       title: "التقارير",
  //       url: "/creator/analytics/reports",
  //     },
  //   ],
  // },
  // {
  //   title: "الارباح",
  //   url: "/creator/analytics",
  //   icon: ChartColumnBig,
  //   items: [
  //     {
  //       title: "نظرة عامة",
  //       url: "/creator/analytics",
  //     },
  //     {
  //       title: "المبيعات",
  //       url: "/creator/analytics/sales",
  //     },
  //     {
  //       title: "الأداء",
  //       url: "/creator/analytics/performance",
  //     },
  //     {
  //       title: "التقارير",
  //       url: "/creator/analytics/reports",
  //     },
  //   ],
  // },
];

export function CreatorSidebar({ ...props }) {
  return (
    <Sidebar
      variant="inset"
      {...props}
      dir="rtl"
      className="[--sidebar:theme(colors.gray.100)] [--sidebar-border:theme(colors.gray.200)] fixed top-0 left-0"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="/creator" className="flex justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.6364 0H6.81836V20H12.6364V0Z" fill="#6E83F5" />
                <path d="M12.6364 20H6.81836V40H12.6364V20Z" fill="#6E83F5" />
                <path d="M33.1813 0H27.3633V20H33.1813V0Z" fill="#33E2BD" />
                <path
                  d="M0 7.09098L0 12.909L17.5908 12.909V7.09098L0 7.09098Z"
                  fill="#BD6BEE"
                />
                <path
                  d="M20 7.09138V12.9094L40 12.9094V7.09138L20 7.09138Z"
                  fill="#33E2BD"
                />
                <path
                  d="M33.1813 22.3897H27.3633V39.9805H33.1813V22.3897Z"
                  fill="#BD6BEE"
                />
                <path d="M0 27.0914L0 32.9094H20V27.0914H0Z" fill="#6E83F5" />
                <path d="M20 27.0914V32.9094H40V27.0914H20Z" fill="#6E83F5" />
              </svg>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-4">
        <SidebarMenu>
          <div className="flex flex-col gap-2">
            {data.map((item) => (
              <Link
              key={item.title}
                href={item.url}
                className={`flex flex-col gap-1 items-center justify-center p-3 cursor-pointer rounded-lg text-muted-foreground ${
                  item.isActive ? "bg-gray-50 border text-primary" : ""
                }`}
              >
                <item.icon className="size-6" />
                <span
                  className={`text-sm  ${item.isActive ? "font-semibold" : ""}`}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
