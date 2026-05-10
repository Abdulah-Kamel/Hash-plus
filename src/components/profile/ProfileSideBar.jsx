"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { getMyProfile, getProfileImage, removeMyProfile } from "@/actions/profileActions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const links = [
  { name: "عرض ملفي العام", href: "/my-profile" },
  { name: "الملف الشخصي", href: "/profile" },
  { name: "أمان الحساب", href: "/profile/security" },
  { name: "الخصوصية", href: "/profile/privacy" },
  { name: "إعدادات الإشعارات", href: "/profile/notifications" },
  { name: "اغلاق الحساب", href: "#close-account", isDestructive: true },
];

const ProfileSideBar = ({ profileData, profileImage: externalImage }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (profileData) {
      setUserData(profileData);
    } else {
      getMyProfile().then((res) => {
        if (res.success) setUserData(res.data);
      });
    }
  }, [profileData]);

  useEffect(() => {
    if (externalImage !== undefined) {
      setProfileImage(externalImage);
    } else {
      getProfileImage().then((res) => {
        if (res.success && res.data?.url) setProfileImage(res.data.url);
      });
    }
  }, [externalImage]);

  const handleCloseAccount = async () => {
    setIsDeleting(true);
    try {
      const res = await removeMyProfile();
      if (res.success) {
        toast.success("تم حذف الحساب بنجاح");
        router.push("/");
      } else {
        toast.error(res.error || "فشل حذف الحساب");
      }
    } catch {
      toast.error("حدث خطأ أثناء حذف الحساب");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const initials = userData?.name
    ? userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "..";

  return (
    <>
      <Card className="gap-3 p-4">
        <CardHeader className="flex flex-col justify-center items-center gap-4 py-3">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={profileImage || ""}
              className="w-32 rounded-full object-cover"
            />
            <AvatarFallback className="rounded-full p-4 bg-gray-200 text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="font-semibold text-lg">
              {userData?.name || "..."}
            </h2>
            <p className="text-muted-foreground text-sm font-medium">
              {userData?.email || ""}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <nav className="w-full">
            <ul className="flex flex-col gap-2">
              {links.map((link) => {
                if (link.isDestructive) {
                  return (
                    <li key={link.href}>
                      <button
                        type="button"
                        onClick={() => setDeleteDialogOpen(true)}
                        className="block w-full text-right rounded-md px-4 py-3 text-sm font-normal transition hover:bg-red-50 hover:text-red-600 text-red-500 cursor-pointer"
                      >
                        {link.name}
                      </button>
                    </li>
                  );
                }
                return (
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
                );
              })}
            </ul>
          </nav>
        </CardContent>
      </Card>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader className="text-right">
            <DialogTitle className="text-xl font-semibold text-red-600">
              اغلاق الحساب
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-right leading-relaxed">
              هل أنت متأكد من رغبتك في حذف حسابك؟ هذا الإجراء لا يمكن التراجع
              عنه وسيتم حذف جميع بياناتك نهائياً.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="rounded-full px-6 cursor-pointer"
              >
                إلغاء
              </Button>
              <Button
                onClick={handleCloseAccount}
                disabled={isDeleting}
                className="rounded-full px-6 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                {isDeleting ? "جاري الحذف..." : "حذف الحساب"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileSideBar;
