import { lazy, Suspense } from "react";
import ErrorBoundedComponent from "./ErrorBoundedComponent";
import AppSuspense from "@/pages/AppSuspense";

/**
 * Problem with this is that it only uses the suspense
 * @param importFunc
 * @returns
 */
export const LazyWithSuspense = (
  importFunc: () => Promise<{ default: React.ComponentType }>
) => {
  const Component = lazy(importFunc);
  return (props: any) => (
    <ErrorBoundedComponent>
      <Suspense fallback={<AppSuspense />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundedComponent>
  );
};
