import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const AppHeader = ({ onToggleMobileSidebar }: HeaderProps) => {
  return (
    <div className="h-20 bg-white w-full fixed top-0 z-20">
      <Button
        onClick={onToggleMobileSidebar}
        className="relative text-black border-1 border-primary size-10 p-1 cursor-pointer"
        variant="ghost"
        asChild
      >
        <Menu />
      </Button>
    </div>
  );
};

type HeaderProps = {
  onToggleMobileSidebar: () => void;
};

export default AppHeader;
