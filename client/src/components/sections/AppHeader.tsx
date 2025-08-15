import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const AppHeader = ({ onToggleMobileSidebar }: HeaderProps) => {
  return (
    <div>
      <Button asChild onClick={onToggleMobileSidebar}>
        <Menu size="24px" />
      </Button>
    </div>
  );
};

type HeaderProps = {
  onToggleMobileSidebar: () => void;
};

export default AppHeader;
