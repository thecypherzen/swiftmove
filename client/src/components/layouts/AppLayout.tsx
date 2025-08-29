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
    <main className="bg-background dark:bg-dark h-[99.9svh] max-w-[var(--max-vw,1440px)] m-auto overflow-y-hidden overflow-x-auto">
      {/* Header */}
      <SidebarProvider offsetT={true} before={<AppHeader />}>
        <AppSidebar
          hasNavedRef={hasNavedRef}
          className="transform-3d translate-z-0"
        />
        <section className="w-full bg-background dark:bg-dark">
          <div
            className={cn(
              "flex items-center gap-3 py-2 pr-4 sticky z-50 top-20 backdrop-blur-lg bg-background/50 dark:bg-dark/50 transition-discrete duration-400 w-full",
              isMobile && "pr-4",
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
                    "rounded-full size-6 p-2 bg-primary dark:bg-primary-600 hover:bg-primary-600 hover:dark:bg-primary-700 !text-neutral-50 transition-all duration-300",
                    isMobile && "ml-2"
                  )}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <ArrowLeft />
                </Button>
              )}
            </div>
            {<Breadcrumbs className="opacity-85" />}
          </div>
          <Outlet />
        </section>
      </SidebarProvider>
    </main>
  );
};

export default AppLayout;
