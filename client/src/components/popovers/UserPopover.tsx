import { cn } from "@/lib/utils";

import { Bell, LogOut, Power, UserCircle } from "lucide-react";

const content = [
  { name: "Profile", icon: UserCircle },
  { name: "Notifications", icon: Bell },
];

const footer = [
  { name: "Logout", icon: LogOut },
  { name: "Delete Account", icon: Power },
];
const UserPopover = ({ className }: UserPopoverPropsType) => {
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      <div>
        {
          <>
            {content.map((item, index) => (
              <div
                key={`card-item-${index + 1}`}
                className="w-full px-4 py-2 hover:bg-muted rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="size-5" />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </>
        }
      </div>
      <hr className="border-t border-t-muted" />
      <div className="flex-col items-center justify-center gap-4">
        <>
          {footer.map((item, index) => (
            <div
              key={`card-footer-${index + 1}`}
              className={cn(
                "w-full px-4 py-2 hover:bg-muted rounded-md cursor-pointer transition-all duration-300",
                item.name === "Delete Account" &&
                  "text-destructive-500 hover:text-red-50 hover:bg-destructive-700"
              )}
            >
              <div className={"flex items-center gap-4"}>
                <item.icon className="size-5" />
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </>
      </div>
    </section>
  );
};

export type UserPopoverPropsType = {
  className?: string;
};

export default UserPopover;
