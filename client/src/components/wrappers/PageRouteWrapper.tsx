import { cn } from "@/lib/utils";
import React from "react";

const PageRouteWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "mt-10 ml-[1rem] rounded-lg dark:bg-dark bg-background h-[calc(100svh-120px)] overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageRouteWrapper;
