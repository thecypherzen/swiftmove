import { useTheme } from "@/hooks/UseTheme";
import AppLogo from "../utils/Logo";
import SearchInput from "../utils/SearchInput";
import ThemeToggle from "../utils/ThemeToggle";
import NotificationIcon from "../utils/NotificationIcon";
import { useAuth } from "@/hooks/UseAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UseIsMobile } from "@/hooks/UseIsMobile";
import { cn } from "@/lib/utils";

const Searchbar = SearchInput;

const AppHeader = ({ onToggleMobileSidebar }: HeaderProps) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isMobile = UseIsMobile();
  console.log("isMobile:", isMobile);
  return (
    <header className="h-20 bg-background w-full fixed top-0 z-20  flex items-center justify-between border-b border-b-muted">
      <div className="w-95/100 md:w-98/100 max-w-[1256px] h-4/5 m-auto flex items-center justify-between">
        {/* Logo */}
        <AppLogo
          variant={theme === "dark" ? "light" : "dark"}
          type={isMobile ? "logo" : "default"}
          className={cn("cursor-pointer", isMobile ? "w-16" : "w-40")}
        />
        {/* Search bar */}
        <Searchbar
          withIcon={true}
          placeholder="Search drivers, orders..."
          variant={isMobile ? "modal" : "default"}
        />
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <ThemeToggle size={5} />
          <NotificationIcon />
          <div className="flex items-center space-x-3 ml-2">
            <Avatar className="size-10">
              <AvatarImage src={`${user?.avatar}`} alt={`${user?.firstName}`} />
              <AvatarFallback>
                {(user?.firstName ?? user?.email)?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

type HeaderProps = {
  onToggleMobileSidebar: () => void;
};

export default AppHeader;
