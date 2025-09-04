import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";

const ErrorBoundedComponent = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default ErrorBoundedComponent;
