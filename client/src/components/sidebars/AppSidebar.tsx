import { NavLink, useLocation } from "react-router-dom";
import { Home, Package, Truck, Users, BarChart3, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { UseIsMobile } from "@/hooks/UseIsMobile";
import AppLogo from "../utils/Logo";
import { useTheme } from "@/hooks/UseTheme";
import UserAvatar from "../utils/UserAvatar";
import { useAuth } from "@/hooks/UseAuth";
const navItems = [
  { name: "Dashboard", href: "/home/dashboard", icon: Home },
  { name: "Shipments", href: "/home/shipments", icon: Package },
  { name: "Deliveries", href: "/home/deliveries", icon: Truck },
  { name: "Drivers", href: "/home/drivers", icon: Users },
  { name: "Analytics", href: "/home/analytics", icon: BarChart3 },
];

const settingsItems = [
  { name: "Settings", href: "/home/settings", icon: Settings },
];

const AppSidebar = () => {
  const path = useLocation().pathname;
  const isMobile = UseIsMobile();
  const { theme } = useTheme();

  console.log(path);
  const menuItemClassName = "transition-[color] duration-200";
  const menuButtonClassName =
    "hover:text-primary-100 transition-[background] duration-300";
  const activeMenuBtnStyles = "hover:bg-primary-600";
  const inactiveMenuBtnStyles = "";
  const { user } = useAuth();
  const { open } = useSidebar();
  console.log("sidebar open:", open, "ismobile:", isMobile);
  return (
    <Sidebar offsetT={true} collapsible="icon">
      {/* Sidebar Header */}
      {isMobile && (
        <SidebarHeader className="py-6 px-2 border-b border-b-muted">
          <div className="w-1/2">
            <AppLogo variant={theme === "dark" ? "light" : "dark"} />
          </div>
        </SidebarHeader>
      )}
      {/* Sidebar Content */}
      <SidebarContent>
        {/* Navigation Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name} className={menuItemClassName}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      menuButtonClassName,
                      path === item.href
                        ? activeMenuBtnStyles
                        : inactiveMenuBtnStyles
                    )}
                  >
                    <NavLink to={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Manage Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.name} className={menuItemClassName}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      menuButtonClassName,
                      path === item.href
                        ? activeMenuBtnStyles
                        : inactiveMenuBtnStyles
                    )}
                  >
                    <NavLink to={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="border-t border-t-muted">
        <div
          id="footer-content-wrapper"
          className={cn(
            "py-4 text-sm flex gap-2 justify-between items-center cursor-pointer transition-all duration-500",
            open
              ? "pr-4 pl-1 hover:bg-muted/40 hover:rounded-md"
              : "px-1.2 [&_[data-slot=avatar]:hover]:border-1 [&_[data-slot=avatar]:hover]:border-white/30"
          )}
        >
          <div id="footer-user-info" className="flex items-center gap-2">
            <UserAvatar className={!open ? "" : ""} size={open ? 10 : 8} />
            {(open || isMobile) && (
              <div className="flex flex-col gap-1.5">
                <p className="font-medium leading-none">
                  {user?.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.email}
                </p>
                <p className="text-xs text-muted-foreground leading-none">
                  {`${(user?.role ?? "User").charAt(0).toUpperCase()}${(
                    user?.role ?? "User"
                  ).slice(1)}`}
                </p>
              </div>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

//type SidebarPropsType = {
//  className?: string;
//  onNavigate?: () => void;
//};

export default AppSidebar;
