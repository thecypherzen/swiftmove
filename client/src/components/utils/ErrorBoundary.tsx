import React, { type PropsWithChildren } from "react";

export class ErrorBoundary extends React.Component<PropsWithChildren<{}>> {
  state: EBStateType = { errorOccured: false, error: null, errorInfo: null };

  static getDerrivedStateFromError() {
    return { errorOccured: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("An Error Occured", error, errorInfo);
    this.state.error = error;
    this.state.errorInfo = errorInfo;
  }

  render() {
    if (this.state.errorOccured) {
      return <div>An Error Occured</div>;
    }
    return this.props.children;
  }
}

type EBStateType = {
  errorOccured: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};
