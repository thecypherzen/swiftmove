import AppHeader from "../sections/AppHeader";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../sidebars/AppSidebar";
import { UseIsMobile } from "@/hooks/UseIsMobile";

const AppLayout = () => {
  const isMobile = UseIsMobile();

  return (
    <main className="min-h-screen bg-background dark:bg-dark">
      <SidebarProvider offsetT={true}>
        {/* Header */}
        <AppHeader />
        <AppSidebar />
        <main className="w-full">
          {!isMobile && <SidebarTrigger className="mx-4" />}
          <Outlet />
        </main>
      </SidebarProvider>
    </main>
  );
};

export default AppLayout;
