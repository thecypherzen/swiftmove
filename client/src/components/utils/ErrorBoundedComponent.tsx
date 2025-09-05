import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";

const ErrorBoundedComponent = ({
  children,
  showBackBtn = true,
}: {
  children: React.ReactNode;
  showBackBtn?: boolean;
}) => {
  return <ErrorBoundary showBackBtn={showBackBtn}>{children}</ErrorBoundary>;
};

export default ErrorBoundedComponent;
