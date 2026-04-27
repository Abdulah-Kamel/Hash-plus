"use client";
import React from "react";
import Link from "next/link";
import NavSearch from "./NavSearch";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  User,
  BookOpen,
  Heart,
  Settings,
  LogOut,
  ShoppingBag,
  Star,
MessageSquare,
  Globe,
  LayoutDashboard,
} from "lucide-react";
import { logout } from "@/actions/logoutAction";

const NavActions = () => {
  const { user, loading, isAuthenticated } = useAuth();

  const roleLabel =
    user?.role === "instructor"
      ? "معلم"
      : user?.role === "admin"
        ? "مدير"
        : "طالب";

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "U";

  if (loading) {
    return (
      <div className="hidden xl:flex items-center gap-2 xl:order-2">
        <NavSearch />
        <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="hidden xl:flex items-center gap-2 xl:order-2">
      <NavSearch />

      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          {/* Notification bell */}
          <button className="relative p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          {/* Avatar dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer focus:outline-none">
                <Avatar className="w-9 h-9 ring-2 ring-primary/30 hover:ring-primary transition-all">
                  <AvatarImage
                    src={user?.profilePhoto}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-primary text-white font-semibold text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-64 px-0 py-0 shadow-xl rounded-2xl border border-gray-100 overflow-hidden"
              align="end"
              dir="rtl"
              sideOffset={8}
            >
              {/* User header */}
              <div className="flex items-center gap-3 px-4 py-4 bg-gray-50 border-b border-gray-100">
                <Avatar className="w-11 h-11 ring-2 ring-primary/20">
                  <AvatarImage
                    src={user?.profilePhoto}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-primary text-white font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-right">
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    {user?.name}
                  </p>
                  <span className="inline-block text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-0.5 mt-0.5">
                    {roleLabel}
                  </span>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-2">
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <User className="w-4 h-4 shrink-0" />
                    <span>الملف الشخصي</span>
                  </Link>
                </DropdownMenuItem>

                {(user?.role === "instructor" || user?.role === "admin") && (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/creator/home"
                      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 shrink-0" />
                      <span>لوحة تحكم المعلم</span>
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem asChild>
                  <Link
                    href="/my-learning"
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>مكتبة التعلم</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/favorites"
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <Heart className="w-4 h-4 shrink-0" />
                    <span>المفضلة</span>
                  </Link>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="my-0" />

              {/* Language */}
              <div className="py-2">
                <DropdownMenuItem className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors">
                  <Globe className="w-4 h-4 shrink-0" />
                  <span>اللغة</span>
                  <span className="mr-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    العربية
                  </span>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <Settings className="w-4 h-4 shrink-0" />
                    <span>اعدادات الحساب</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>سجل المشتريات</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/reviews"
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <Star className="w-4 h-4 shrink-0" />
                    <span>تقييم هاش بلس</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>تواصل معنا</span>
                  </Link>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="my-0" />

              {/* Logout */}
              <div className="py-2">
                <DropdownMenuItem
                  className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors focus:text-red-600 focus:bg-red-50"
                  onSelect={async () => {
                    await logout();
                  }}
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </div>

              {/* Be a Creator CTA */}
              {user?.role !== "instructor" && (
                <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                  <Link
                    href="/become-instructor"
                    className="block w-full text-center text-sm font-medium text-primary border border-primary rounded-full py-2 hover:bg-primary hover:text-white transition-colors"
                  >
                    كن معلماً على هاش بلس
                  </Link>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link
          href="/auth/login"
          className="text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary/30 font-medium rounded-full text-sm px-5 py-2 text-center hover:bg-primary/90 transition-colors"
        >
          تسجيل الدخول
        </Link>
      )}
    </div>
  );
};

export default NavActions;
