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
        "m-auto md:ml-[1rem] dark:bg-dark bg-background h-[calc(100svh-130px)] w-[calc(100%-1rem)] overflow-y-scroll overflow-x-hidden  scrollbar scrollbar-w-[6px]  scrollbar-thumb-rounded-full hover:dark:scrollbar-thumb-primary/80 hover:scrollbar-thumb-primary-600/80",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageRouteWrapper;
