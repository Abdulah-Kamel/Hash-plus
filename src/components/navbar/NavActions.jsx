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
  ShoppingCart,
  User,
  BookOpen,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";

const NavActions = () => {
  const { user, token, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="hidden lg:flex items-center gap-2 lg:order-2">
        <NavSearch />
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-2 lg:order-2">
      <NavSearch />

      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative p-2 rounded-full border transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          </Link>

          <button className="relative p-2 rounded-full border transition-colors cursor-pointer">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={user?.profilePhoto}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="px-6 py-2" align="end" dir="rtl">
              <DropdownMenuLabel className="text-right">
                حسابي
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  الملف الشخصي
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/my-learning"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  مكتبة التعلم
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/favorites"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4" />
                  المفضلة
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  إعدادات الحساب
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="w-4 h-4" />
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link
          href="/login"
          className="text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-full text-sm px-5 py-2 text-center hover:bg-primary/90 transition-colors"
        >
          تسجيل الدخول
        </Link>
      )}
    </div>
  );
};

export default NavActions;
