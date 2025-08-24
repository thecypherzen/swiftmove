import { useTheme } from "@/hooks/UseTheme";
import AppLogo from "../utils/Logo";
import SearchInput from "../utils/SearchInput";
import ThemeToggle from "../utils/ThemeToggle";
import { UseIsMobile } from "@/hooks/UseIsMobile";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";
import { Menu } from "lucide-react";
import UserAvatar from "../utils/UserAvatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import UserPopover from "../popovers/UserPopover";

const Searchbar = SearchInput;

const AppHeader = () => {
  const { theme } = useTheme();
  const isMobile = UseIsMobile();
  console.log("isMobile:", isMobile);
  return (
    <header className="h-20 bg-background dark:bg-dark w-full fixed top-0 z-20  flex items-center justify-between border-b border-b-muted">
      <div className="w-95/100 md:w-98/100 max-w-[1256px] h-4/5 m-auto flex gap-6 items-center justify-between">
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
          <div className="flex items-center space-x-3 ml-2">
            {isMobile ? (
              <SidebarTrigger icon={<Menu className="size-7" />} />
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
