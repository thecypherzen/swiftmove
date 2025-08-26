import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const BreadcrumbContext = createContext<BcContextType>({
  breadcrumb: (_: BcPropsType) => <></>,
  setItems: () => {},
  ref: React.createRef<HTMLElement>(),
});

export const BreadCrumbProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [crumbs, setCrumbs] = useState<(p: BcPropsType) => React.JSX.Element>(
    () => (_: BcPropsType) => <></>
  );
  const [items, setItems] = useState<Array<BreadcrumbItemType>>([
    { label: "Home", href: "/home", endpoint: "home" },
    { label: "Analytics", href: "/home/analytics", endpoint: "home" },
    { label: "Dashboard", href: "/home/dashboard", endpoint: "dashboard" },
    { label: "Deliveries", href: "/home/deliveries", endpoint: "deliveries" },
    { label: "Drivers", href: "/home/drivers", endpoint: "drivers" },
    { label: "Shipments", href: "/home/shipments", endpoint: "shipments" },
    { label: "Settings", href: "/home/settings", endpoint: "settings" },
    { label: "Account", href: "/home/account", endpoint: "account" },
    {
      label: "Notifications",
      href: "/home/notifications",
      endpoint: "notifications",
    },
  ]);

  const ref = useRef<HTMLElement>(null);
  const createCrumbs = useCallback((list: Array<string>) => {
    return ({ className }: BcPropsType) => {
      return (
        <Breadcrumb ref={ref} className={className}>
          <BreadcrumbList>
            {list.length === 0 ? (
              <></>
            ) : (
              list.map((item, index) => {
                const matched = items.find((i) => i.endpoint === item);
                const isLast = index + 1 === list.length;
                if (matched) {
                  return (
                    <>
                      <BreadcrumbItem key={`crumb-item-${index}`}>
                        {isLast ? (
                          <BreadcrumbPage className="font-semibold">
                            {matched.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={matched.href}>{matched.label}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </>
                  );
                }
                return <></>;
              })
            )}
          </BreadcrumbList>
        </Breadcrumb>
      );
    };
  }, []);

  const path = useLocation().pathname;
  const pathRef = useRef(path);
  const list = path.split("/").filter((p) => p);

  useEffect(() => {
    if (path !== pathRef.current) {
      pathRef.current = path;
      setCrumbs(() => createCrumbs(list));
    }
  }, [path]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb: crumbs, setItems, ref }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const UseBreadcrumbs = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("UseBreadcrumbs must be used within a BreadCrumbProvider");
  }
  return context;
};

type BreadcrumbLabelType =
  | "Home"
  | "Analytics"
  | "Dashboard"
  | "Deliveries"
  | "Drivers"
  | "Shipments"
  | "Settings"
  | "Account"
  | "Notifications";

type BreadcrumbItemType = {
  label: BreadcrumbLabelType;
  href: string;
  endpoint: Lowercase<BreadcrumbLabelType>;
};
type BcPropsType = {
  className?: string;
};

export type BcContextType = {
  breadcrumb: ({ className }: BcPropsType) => React.JSX.Element;
  setItems: React.Dispatch<React.SetStateAction<Array<BreadcrumbItemType>>>;
  ref: React.RefObject<HTMLElement | null>;
};
