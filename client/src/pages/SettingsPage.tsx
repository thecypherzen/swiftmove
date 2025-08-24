import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Bell, LogOut, Power, UserCircle } from "lucide-react";

const content = [
  { name: "Profile", icon: UserCircle },
  { name: "Notifications", icon: Bell },
];

const footer = [
  { name: "Logout", icon: LogOut },
  { name: "Delete Account", icon: Power },
];
const SettingsPage = () => {
  return (
    <div className="route-page">
      <Card>
        <CardContent>
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
        </CardContent>
        <CardFooter className="flex-col items-center justify-center gap-4 border-t border-t-muted">
          <>
            {footer.map((item, index) => (
              <div
                key={`card-footer-${index + 1}`}
                className="w-full px-4 py-2 hover:bg-muted rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="size-5" />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsPage;
