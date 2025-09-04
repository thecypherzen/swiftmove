import React, { type PropsWithChildren } from "react";
import { Card, CardContent } from "../ui/card";
import { AlertTriangle } from "lucide-react";
import PageRouteWrapper from "../wrappers/PageRouteWrapper";

export class ErrorBoundary extends React.Component<PropsWithChildren<{}>> {
  state: EBStateType = {
    errorOccured: false,
    error: null,
    errorInfo: null,
    isDevEnv: import.meta.env.VITE_ENV === "prod",
  };

  static getDerivedStateFromError(_: Error) {
    return { errorOccured: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ errorOccured: true, error, errorInfo });
  }

  render() {
    if (this.state.errorOccured) {
      return (
        <PageRouteWrapper>
          <div className="h-full w-full bg-background border-neutral-60 flex flex-col">
            <div className="min-h-4/5 w-full flex items-center justify-center bg-background">
              <Card className="w-full max-w-md mx-4 min-h-3/5">
                <CardContent className="pt-6 flex flex-col justify-center gap-5">
                  <div className="flex flex-col justify-center items-center gap-2 ">
                    <AlertTriangle className="size-10 text-red-600" />
                    <h2 className="text-2xl font-medium text-foreground dark:text-neutral-100">
                      <span className="font-semibold italic mr-1">Sorry.</span>
                      <span>We encountered an error</span>
                    </h2>
                  </div>
                  {/* Message */}
                  <p className="text-sm text-gray-600">
                    {this.state.error
                      ? `${this.state.error.message}`
                      : "Try again later"}
                  </p>
                  {this.state.isDevEnv && this.state.errorInfo && (
                    <div>{this.state.errorInfo.componentStack}</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </PageRouteWrapper>
      );
    }
    return this.props.children;
  }
}

type EBStateType = {
  errorOccured: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  isDevEnv: boolean;
};
