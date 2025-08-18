import { useTheme } from "@/hooks/useTheme";
import AppLogo from "../utils/Logo";

const AppHeader = ({ onToggleMobileSidebar }: HeaderProps) => {
  const { theme } = useTheme();
  return (
    <header className="h-15 bg-white w-full fixed top-0 z-20 w-[95/10] max-w-[1050px] flex items-center justify-between">
      <AppLogo variant={theme === "dark" ? "light" : "dark"} />
    </header>
  );
};

type HeaderProps = {
  onToggleMobileSidebar: () => void;
};

export default AppHeader;
