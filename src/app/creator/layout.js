"use client";

import { CreatorSidebar } from "@/components/creator/CreatorSidebar";
import CreatorTopBar from "@/components/creator/CreatorTopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// Routes that should render without the creator sidebar (full-page layout)
const fullPageRoutes = ["/creator/onbording", "/creator/content"];

export default function CreatorLayout({ children }) {
  const pathname = usePathname();
  const isFullPage = fullPageRoutes.some((route) => pathname.startsWith(route));

  if (isFullPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "100px",
        "--sidebar-width-mobile": "100px",
      }}
    >
      <div className="flex w-full">
        <CreatorSidebar />
        <div className="flex-1 p-2">
          <div className="border border-gray-300 min-h-screen rounded-lg p-4 space-y-4">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
