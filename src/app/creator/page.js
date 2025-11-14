import { CreatorSidebar } from "@/components/creator/CreatorSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const CreatorPage = () => {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "100px",
        "--sidebar-width-mobile": "100px",
      }}
    >
      <CreatorSidebar />
    </SidebarProvider>
  );
};

export default CreatorPage;
