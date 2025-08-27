import AppHeader from "../sections/AppHeader";
import { Outlet, useNavigate } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../sidebars/AppSidebar";
import { UseIsMobile } from "@/hooks/UseIsMobile";
import { UseBreadcrumbs } from "@/hooks/Breadcrumbs";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";

const AppLayout = () => {
  const isMobile = UseIsMobile();
  const hasNavedRef = useRef<boolean | undefined>(undefined);
  const navigate = useNavigate();
  const { breadcrumb: Breadcrumbs } = UseBreadcrumbs();

  return (
    <main className="bg-background dark:bg-dark h-full">
      <SidebarProvider offsetT={true}>
        {/* Header */}
        <AppHeader />
        <AppSidebar hasNavedRef={hasNavedRef} />
        <main className="w-full bg-background dark:bg-dark">
          <div
            className={cn(
              "flex items-center gap-3 py-2 pr-4 fixed z-50 backdrop-blur-lg bg-background/50 dark:bg-dark/80 transition-discrete duration-400",
              isMobile
                ? "w-full"
                : "w-[calc(100vw-var(--sidebar-width,0px)-var(--scrollbar-width,10px))]",
              isMobile && "px-3",
              hasNavedRef.current
                ? "justify-between"
                : isMobile
                ? "justify-center"
                : "justify-start"
            )}
          >
            <div>
              {!isMobile && <SidebarTrigger className="mx-4" />}
              {hasNavedRef.current && (
                <Button
                  variant="ghost"
                  className={cn(
                    "rounded-full p-2 bg-primary dark:bg-primary-600 hover:bg-primary-600 hover:dark:bg-primary-700 !text-neutral-50 transition-all duration-300",
                    isMobile ? "size-6" : "size-8"
                  )}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <ArrowLeft />
                </Button>
              )}
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
