"use client";
import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, User, BookOpen, Heart, Settings, ShoppingBag, Star, MessageSquare, LogOut, Globe, LayoutDashboard } from "lucide-react";
import NavSearch from "./NavSearch";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/actions/logoutAction";

const MobileMenu = ({ navLinks, isOpen, onClose }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, isAuthenticated, loading } = useAuth();

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

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

  return (
    <div
      id="mobile-nav"
      className={`fixed top-0 right-0 z-40 h-screen w-72 bg-white shadow-2xl transition-transform duration-300 xl:hidden flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="mobile-nav-label"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h5
          id="mobile-nav-label"
          className="text-base font-semibold text-gray-900"
        >
          القائمة
        </h5>
        <button
          type="button"
          className="text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-lg p-2 transition-colors"
          onClick={onClose}
        >
          <span className="sr-only">Close sidebar</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* — User panel (authenticated) — */}
        {!loading && isAuthenticated && (
          <div className="px-4 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Avatar className="w-11 h-11 ring-2 ring-primary/20">
                <AvatarImage src={user?.profilePhoto} alt={user?.name} />
                <AvatarFallback className="bg-primary text-white font-bold text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm">{user?.name}</p>
                <span className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">
                  {roleLabel}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* — Nav Links — */}
        <ul className="py-2 font-medium" dir="rtl">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <li key={link.id}>
                  <button
                    onClick={() => handleDropdownToggle(link.id)}
                    className="flex w-full items-center justify-between py-2.5 px-4 hover:bg-gray-50 transition-colors text-gray-700"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openDropdown === link.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openDropdown === link.id && (
                    <ul className="py-1 text-sm bg-gray-50">
                      {link.dropdownItems.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            className="block px-6 py-2 text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors"
                            onClick={onClose}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="block py-2.5 px-4 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* — Search — */}
        <div className="px-4 py-3 border-t border-gray-100">
          <NavSearch isMobile />
        </div>

        {/* — Authenticated user menu — */}
        {!loading && isAuthenticated && (
          <div className="border-t border-gray-100" dir="rtl">
            <ul className="py-2">
              {[
                { href: "/profile", icon: User, label: "الملف الشخصي" },
                ...(user?.role === "instructor" || user?.role === "admin"
                  ? [{ href: "/creator/home", icon: LayoutDashboard, label: "لوحة تحكم المعلم" }]
                  : []),
                { href: "/my-learning", icon: BookOpen, label: "مكتبة التعلم" },
                { href: "/favorites", icon: Heart, label: "المفضلة" },
                { href: "/settings", icon: Settings, label: "اعدادات الحساب" },
                { href: "/orders", icon: ShoppingBag, label: "سجل المشتريات" },
                { href: "/reviews", icon: Star, label: "تقييم هاش بلس" },
                { href: "/contact", icon: MessageSquare, label: "تواصل معنا" },
              ].map(({ href, icon: Icon, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 py-2.5 px-4 text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors text-sm"
                    onClick={onClose}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}

              <li>
                <button
                  onClick={async () => {
                    onClose();
                    await logout();
                  }}
                  className="flex items-center gap-3 w-full py-2.5 px-4 text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  تسجيل الخروج
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* — Guest login button — */}
        {!loading && !isAuthenticated && (
          <div className="px-4 py-3 border-t border-gray-100">
            <Link
              href="/auth/login"
              className="w-full block text-white text-center bg-primary rounded-full py-2.5 font-medium hover:bg-primary/90 transition-colors"
              onClick={onClose}
            >
              تسجيل الدخول
            </Link>
          </div>
        )}
      </div>

      {/* — Bottom CTA (authenticated non-instructor) — */}
      {!loading && isAuthenticated && user?.role !== "instructor" && (
        <div className="border-t border-gray-100 px-4 py-4 bg-gray-50">
          <Link
            href="/become-instructor"
            className="block w-full text-center text-sm font-medium text-primary border border-primary rounded-full py-2.5 hover:bg-primary hover:text-white transition-colors"
            onClick={onClose}
          >
            كن معلماً على هاش بلس
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
