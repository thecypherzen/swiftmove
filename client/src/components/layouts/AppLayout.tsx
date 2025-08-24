import { useState } from "react";
import AppHeader from "../sections/AppHeader";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../sidebars/AppSidebar";
import { UseIsMobile } from "@/hooks/UseIsMobile";

const AppLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = UseIsMobile();

  return (
    <main className="min-h-screen bg-background">
      <SidebarProvider offsetT={true}>
        {/* Header */}
        <AppHeader
          onToggleMobileSidebar={() =>
            setIsMobileSidebarOpen(!isMobileSidebarOpen)
          }
        />
        <AppSidebar />
        <main className="w-full">
          {!isMobile && <SidebarTrigger />}
          <Outlet />
        </main>
      </SidebarProvider>
    </main>
  );
};

export default AppLayout;
