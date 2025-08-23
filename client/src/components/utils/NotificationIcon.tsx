import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const NotificationIcon = ({ className }: NotificationIconPropsType) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(2);
  }, [unreadCount]);

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("relative size-10", className)}
    >
      <Bell className="size-5" strokeWidth="1.5px" />
      {unreadCount && (
        <span className="absolute top-1 right-0 size-[0.7rem] bg-red-500 rounded-full flex items-center justify-center text-white text-[0.4rem] font-bold">
          {unreadCount}
        </span>
      )}
    </Button>
  );
};

export type NotificationIconPropsType = {
  className?: string;
};
export default NotificationIcon;
