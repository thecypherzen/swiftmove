import { useState } from "react";
import AppHeader from "../sections/AppHeader";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../sidebars/AppSidebar";

const AppLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader
        onToggleMobileSidebar={() =>
          setIsMobileSidebarOpen(!isMobileSidebarOpen)
        }
      />
      <SidebarProvider offsetT={true}>
        <AppSidebar />
        <main className="w-full border-2 border-blue-300">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </main>
  );
};

export default AppLayout;
