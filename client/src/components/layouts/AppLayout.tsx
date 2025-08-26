import AppHeader from "../sections/AppHeader";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../sidebars/AppSidebar";
import { UseIsMobile } from "@/hooks/UseIsMobile";
import { UseBreadcrumbs } from "@/hooks/Breadcrumbs";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  const isMobile = UseIsMobile();
  const { breadcrumb: Breadcrumbs } = UseBreadcrumbs();

  return (
    <main className="bg-background dark:bg-dark h-full">
      <SidebarProvider offsetT={true}>
        {/* Header */}
        <AppHeader />
        <AppSidebar />
        <main className="w-full">
          <div
            className={cn(
              "flex items-center gap-1 py-2 w-full  fixed z-50",
              isMobile && "ml-[1.2rem]"
            )}
          >
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
