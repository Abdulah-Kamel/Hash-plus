import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = [
  { name: "الملف الشخصي", href: "/profile" },
  { name: "أمان الحساب", href: "/profile/security" },
  { name: "الخصوصية", href: "/profile/privacy" },
  { name: "إعدادات الإشعارات", href: "/profile/notifications" },
];
const ProfileSideBar = () => {
  const pathname = usePathname();
  return (
    <Card className="gap-3 p-4">
      <CardHeader className="flex flex-col justify-center items-center gap-4 py-3">
        <Avatar className="w-32 h-32">
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
  );
};

export default ProfileSideBar;
