import { useState } from "react";
import AppHeader from "../sections/AppHeader";
import { Sidebar } from "../ui/sidebar";
import DashboardSidebar from "../sidebars/DashboardSidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        onToggleMobileSidebar={() =>
          setIsMobileSidebarOpen(!isMobileSidebarOpen)
        }
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden lg:flex lg:w-64" />

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <DashboardSidebar
              className="fixed top-0 left-0 bottom-0 w-5/6 max-w-sm shadow-xl z-50"
              onNavigate={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
