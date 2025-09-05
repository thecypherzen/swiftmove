import AppSuspense from "@/pages/AppSuspense";
import React, { useEffect, useState } from "react";

export const LazyRoute = ({ importFunc, delay = 200 }: LazyRoutePropsType) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [showSuspense, setShowSuspense] = useState<boolean>(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout = setTimeout(() => {
      setShowSuspense(true);
    }, delay);

    importFunc().then((module) => {
      setComponent(module.default);
      setShowSuspense(false);
      clearTimeout(timeout);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, [importFunc, showSuspense]);

  if (showSuspense && !Component) {
    return <AppSuspense />;
  }
  if (!Component) {
    return null;
  }
  return <Component />;
};

type LazyRoutePropsType = {
  importFunc: () => Promise<{ default: React.ComponentType }>;
  delay?: number;
};
