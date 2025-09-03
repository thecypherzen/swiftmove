import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import UseModal from "@/hooks/UseModal";
import SearchInputModal from "../modals/SearchInputModal";

const SearchInput = ({
  className,
  iconClassName,
  placeholder,
  withIcon = false,
  variant = "default",
}: SearchInputPropsType) => {
  if (variant === "default") {
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
  } else {
    const { openSearchInputModal: isOpen, setOpenSearchInputModal: setIsOpen } =
      UseModal();
    const searchContent = (
      <div className="rounded-md bg-background [&_input]:placeholder:text-sm [&_input]:placeholder:text-center w-9/10">
        <Input
          type="text"
          placeholder={placeholder || "Search here..."}
          className="px-5 w-full"
        />
      </div>
    );
    return (
      <>
        <div
          className="flex items-center justify-center size-9 rounded-md bg-muted p-1.5 hover:bg-background hover:border-1 hover:border-muted transition-bg duration-200"
          onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
        >
          <Search className={cn("text-muted-foreground", className)} />
        </div>
        <SearchInputModal content={searchContent} />
      </>
    );
  }
};

export type SearchInputPropsType = {
  withIcon?: boolean;
  iconClassName?: string;
  className?: string;
  placeholder?: string;
  variant?: "default" | "modal";
};

export default SearchInput;
