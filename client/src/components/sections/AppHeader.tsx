import { useTheme } from "@/hooks/UseTheme";
import AppLogo from "../utils/Logo";
import SearchInput from "../utils/SearchInput";
import ThemeToggle from "../utils/ThemeToggle";
import { UseIsMobile } from "@/hooks/UseIsMobile";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import UserAvatar from "../utils/UserAvatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import UserPopover from "../popovers/UserPopover";

const Searchbar = SearchInput;

const AppHeader = () => {
  const { theme } = useTheme();
  const isTablet = UseIsMobile();
  const isMobile = UseIsMobile(500);

  return (
    <header className="h-20 bg-background dark:bg-dark w-full sticky top-0 z-20  flex items-center justify-between border-b border-b-muted border-1 border-yellow-500">
      <div className="w-95/100 md:w-98/100  h-4/5 m-auto flex gap-6 items-center justify-between">
        {/* Logo */}
        <AppLogo
          variant={theme === "dark" ? "light" : "dark"}
          type={isTablet ? "logo" : "default"}
          className={cn("cursor-pointer", isTablet ? "w-16" : "w-40")}
        />
        {/* Search bar */}
        <Searchbar
          withIcon={true}
          placeholder="Search drivers, orders..."
          variant={isMobile ? "modal" : "default"}
        />
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-3 ml-2">
            {isTablet ? (
              <SidebarTrigger
                icon={<Menu className="size-7" />}
                data-probe="from-AppHeader"
              />
            ) : (
              <>
                <ThemeToggle size={5} />
                <Popover>
                  <PopoverTrigger>
                    <UserAvatar className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent sideOffset={12} className="mr-2 w-50 p-1">
                    <UserPopover className="w-full text-sm gap-2" />
                  </PopoverContent>
                </Popover>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
