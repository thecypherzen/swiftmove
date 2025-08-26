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
        "mt-10 ml-[1rem] rounded-lg dark:bg-dark bg-background h-[calc(100svh-120px)] w-[calc(100%-1rem)] overflow-y-scroll overflow-x-hidden  scrollbar scrollbar-w-[6px]  scrollbar-thumb-rounded-full hover:dark:scrollbar-thumb-muted hover:scrollbar-thumb-muted-foreground/70",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageRouteWrapper;
