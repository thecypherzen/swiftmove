import React, { type PropsWithChildren } from "react";
import { Card, CardContent } from "../ui/card";
import { AlertTriangle } from "lucide-react";
import PageRouteWrapper from "../wrappers/PageRouteWrapper";
import { Button } from "../ui/button";
import ErrorDetails from "./ErrorDetails";

export class ErrorBoundary extends React.Component<
  PropsWithChildren<EBPropsType>
> {
  state: EBStateType = {
    errorOccured: false,
    error: null,
    errorInfo: null,
    isDevEnv: import.meta.env.VITE_ENV === "dev",
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
          <div className="h-full w-full bg-background border-neutral-60 flex flex-col p-5">
            <div className="min-h-4/5 max-h-95/10 w-full bg-background overflow-y-scroll p-5 flex flex-col items-center">
              <Card className="w-full max-w-md mx-4">
                <CardContent className="pt-6 flex flex-col justify-center gap-5">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <AlertTriangle className="size-10 text-red-600" />
                    <h2 className="text-2xl font-medium text-foreground dark:text-neutral-100 text-center">
                      <span className="font-semibold italic mr-1">Sorry.</span>
                      <span>We encountered an error</span>
                    </h2>
                  </div>
                  {/* Message */}
                  <p className="text-sm text-gray-600 text-center ">
                    {this.state.error
                      ? `${this.state.error.message}`
                      : "Try again later"}
                  </p>
                  {this.props.showBackBtn && (
                    <Button
                      onClick={() => window.history.back()}
                      variant="secondary"
                      className=""
                    >
                      {" "}
                      Go Back{" "}
                    </Button>
                  )}
                  {this.state.isDevEnv && this.state.errorInfo && (
                    <ErrorDetails
                      error={this.state.error!}
                      errorInfo={this.state.errorInfo}
                    />
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

type EBPropsType = {
  showBackBtn?: boolean;
};
type EBStateType = {
  errorOccured: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  isDevEnv: boolean;
};
