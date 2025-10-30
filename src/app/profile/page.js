"use client";
import Container from "@/components/container";
import Footer from "@/components/footer";
import { NavBar } from "@/components/navbar";
import ProfileImageInput from "@/components/profile/ProfileImageInput";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { name: "الملف الشخصي", href: "/profile" },
  { name: "أمان الحساب", href: "/settings/security" },
  { name: "الخصوصية", href: "/settings/privacy" },
  { name: "إعدادات الإشعارات", href: "/settings/notifications" },
];

const ProfilePage = () => {
  const pathname = usePathname();
  return (
    <>
      <NavBar />
      <Container className="py-12">
        <h1 className="font-bold text-2xl lg:text-3xl">الملف الشخصى</h1>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
          <div className="col-span-1">
            <Card className="gap-3 p-4">
              <CardHeader className="flex flex-col justify-center items-center gap-4 py-3">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="w-32 rounded-full"
                  />
                  <AvatarFallback className="rounded-full p-4 bg-gray-200">
                    CN
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="font-smeibold text-lg">محمد على</h2>
                  <p className="text-muted-foreground text-sm font-medium">
                    mohamedali@gmail.com
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <nav className="w-full">
                  <ul className="flex flex-col gap-2">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "block rounded-md px-4 py-3 text-sm font-normal transition hover:bg-indigo-50 hover:text-primary",
                            pathname === link.href &&
                              "bg-indigo-100/40 text-primary font-semibold"
                          )}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2">
            <Card className="gap-3 p-4 grid grid-cols-3">
                <div className="col-span-1 space-y-4">
                    <h2 className="font-semibold text-xl">الصورة الشخصية</h2>
                    <ProfileImageInput/>
                </div>
                <div className="col-span-2">

                </div>
            </Card>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
};

export default ProfilePage;
