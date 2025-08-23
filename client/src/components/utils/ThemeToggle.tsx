import type React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/UseTheme";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC<ThemeTogglePropsType> = ({
  className,
  size = 5,
}) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      className={cn(
        "bg-transparent ratio-square p-4 rounded-md transition-all duration-300",
        theme === "light"
          ? "text-foreground/80 hover:text-foreground/60"
          : "text-warning",
        className
      )}
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <Moon className={`size-${size}`} />
      ) : (
        <Sun className={`size-${size}`} />
      )}
    </Button>
  );
};

export type ThemeTogglePropsType = {
  className?: string;
  size?: number;
};
export default ThemeToggle;
