import { NavLink, useLocation } from "react-router-dom";
import { Home, Package, Truck, Users, BarChart3 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
const items = [
  { name: "Dashboard", href: "/home/dashboard", icon: Home },
  { name: "Shipments", href: "/home/shipments", icon: Package },
  { name: "Deliveries", href: "/home/deliveries", icon: Truck },
  { name: "Drivers", href: "/home/drivers", icon: Users },
  { name: "Analytics", href: "/home/analytics", icon: BarChart3 },
];

const AppSidebar = () => {
  const path = useLocation().pathname;
  console.log(path);
  //const { user } = useAuth();
  return (
    <Sidebar offsetT={true} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.name}
                  className="transition-[color] duration-200"
                >
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "hover:text-primary-100 transition-[background] duration-300",
                      path === item.href ? "hover:bg-primary-600" : ""
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
    </Sidebar>
  );
};

//type SidebarPropsType = {
//  className?: string;
//  onNavigate?: () => void;
//};

export default AppSidebar;
