import AppHeader from "../sections/AppHeader";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../sidebars/AppSidebar";
import { UseIsMobile } from "@/hooks/UseIsMobile";
import { UseBreadcrumbs } from "@/hooks/Breadcrumbs";
import { useEffect } from "react";

const AppLayout = () => {
  const isMobile = UseIsMobile();
  const { breadcrumb: Breadcrumbs, ref: crumbsRef } = UseBreadcrumbs();

  useEffect(() => {
    console.log("current crumbs:", crumbsRef.current, crumbsRef);
  }, [crumbsRef.current]);

  //const scrolled = UseScroll(50, crumbsRef);
  return (
    <main className="min-h-screen bg-background dark:bg-dark">
      <SidebarProvider offsetT={true}>
        {/* Header */}
        <AppHeader />
        <AppSidebar />
        <main className="w-full">
          <div className="flex items-center gap-1 py-2 w-full">
            {!isMobile && <SidebarTrigger className="mx-4" />}
            {<Breadcrumbs />}
          </div>
          <Outlet />
        </main>
      </SidebarProvider>
    </main>
  );
};

export default AppLayout;
