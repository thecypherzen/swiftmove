import { cn } from "@/lib/utils";
import type React from "react";

const AppLogo: React.FC<LogoPropsType> = ({
  className,
  variant = "primary",
  type = "default",
}) => {
  const Logo = (
    <img
      src={
        variant === "white"
          ? "logo-white.png"
          : variant === "black"
          ? "logo-black.png"
          : "/logo-primary.png"
      }
    />
  );
  const LogoText = (
    <img
      src={
        variant === "white"
          ? "/logo-text-white.png"
          : variant === "light"
          ? "/logo-text-light.png"
          : variant === "black"
          ? "/logo-text-black.png"
          : "/logo-text-dark.png"
      }
    />
  );
  return (
    <div className={cn("flex items-center gap-2 cursor-pointer", className)}>
      {type === "logo" ? (
        <span>{Logo} </span>
      ) : type === "text" ? (
        <span>{LogoText}</span>
      ) : (
        <>
          <span>{Logo}</span>
          <span>{LogoText}</span>
        </>
      )}
    </div>
  );
};

type LogoPropsType = {
  variant?: "light" | "dark" | "black" | "white";
  type?: "logo" | "text" | "default";
  className?: string;
};
export default AppLogo;
