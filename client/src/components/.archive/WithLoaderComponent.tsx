import AppSuspense from "@/pages/AppSuspense";
import React, { useEffect, useState } from "react";

const WithLoaderComponent = ({ children }: WithLoaderPropsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <AppSuspense />;
  return <>{children}</>;
};

type WithLoaderPropsType = {
  children: React.ReactNode;
};
export default WithLoaderComponent;
