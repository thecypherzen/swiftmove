import AppHeader from "../sections/AppHeader";
import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../sidebars/AppSidebar";
import { UseIsMobile } from "@/hooks/UseIsMobile";
import { UseBreadcrumbs } from "@/hooks/Breadcrumbs";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
//import { useRef } from "react";

const AppLayout = () => {
  const isMobile = UseIsMobile();
  //const movRef = useRef<boolean | undefined>(undefined);
  const { breadcrumb: Breadcrumbs } = UseBreadcrumbs();

  return (
    <main className="bg-background dark:bg-dark h-full">
      <SidebarProvider offsetT={true}>
        {/* Header */}
        <AppHeader />
        <AppSidebar />
        <main className="w-full bg-background dark:bg-dark">
          <div
            className={cn(
              "flex items-center justify-between gap-3 py-2 pr-4 w-[calc(100vw-var(--sidebar-width,0px)-var(--scrollbar-width,10px))] fixed z-50 backdrop-blur-lg bg-background/50 dark:bg-dark/80",
              isMobile && "ml-[1.2rem]"
            )}
          >
            <div>
              {!isMobile && <SidebarTrigger className="mx-4" />}
              <Button
                variant="ghost"
                className="rounded-full p-2 size-8 bg-primary-600 hover:!bg-primary text-neutral-50"
                onClick={() => {}}
              >
                <ArrowLeft />
              </Button>
            </div>
            {<Breadcrumbs />}
          </div>
          <Outlet />
        </main>
      </SidebarProvider>
    </main>
  );
};

export default AppLayout;
