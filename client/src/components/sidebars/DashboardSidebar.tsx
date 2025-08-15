import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Home,
  Package,
  Truck,
  Users,
  BarChart3,
  ShieldQuestion,
  User,
} from "lucide-react";
import { useAuth } from "@/hooks/UseAuth";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Shipments", href: "/shipments", icon: Package },
  { name: "Deliveries", href: "/deliveries", icon: Truck },
  { name: "Drivers", href: "/drivers", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

const DashboardSidebar = ({ className, onNavigate }: SidebarPropsType) => {
  const location = useLocation().pathname;
  const { user } = useAuth();

  return (
    <aside
      className={cn(
        "flex flex-col bg-background border-r border-border",
        className
      )}
    >
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} to={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
                onClick={onNavigate}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Role Badge */}
      <div className="px-4 py-4 border-t border-border">
        <Badge variant="secondary" className="w-full justify-center">
          {user?.role === "admin" ? (
            <>
              <ShieldQuestion className="mr-2 h-3 w-3" />
              Administrator
            </>
          ) : (
            <>
              <User className="mr-2 h-3 w-3" />
              User
            </>
          )}
        </Badge>
      </div>
    </aside>
  );
};

type SidebarPropsType = {
  className?: string;
  onNavigate?: () => void;
};

export default DashboardSidebar;
