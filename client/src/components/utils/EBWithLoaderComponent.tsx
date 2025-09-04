import AppSuspense from "@/pages/AppSuspense";
import React, { useEffect, useState } from "react";
import ErrorBoundedComponent from "./ErrorBoundedComponent";

const EBWithLoaderComponent = ({ children }: WithLoaderPropsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <AppSuspense />;
  return <ErrorBoundedComponent>{children}</ErrorBoundedComponent>;
};

type WithLoaderPropsType = {
  children: React.ReactNode;
};
export default EBWithLoaderComponent;
