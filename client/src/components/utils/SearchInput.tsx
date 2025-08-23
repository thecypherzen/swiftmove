import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchInput = ({
  className,
  iconClassName,
  placeholder,
  withIcon = false,
}: SearchInputPropsType) => {
  return (
    <div className={cn("flex-1 max-w-lg", className)}>
      <div className="relative w-full">
        <Input
          type="text"
          placeholder={placeholder || "Search here..."}
          className="pl-10"
        />
        {withIcon && (
          <Search
            className={cn(
              "absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground",
              iconClassName
            )}
          />
        )}
      </div>
    </div>
  );
};

export type SearchInputPropsType = {
  withIcon?: boolean;
  iconClassName?: string;
  className?: string;
  placeholder?: string;
};

export default SearchInput;
