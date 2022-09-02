import { manifestDb } from "@/utils/indexeddb";
import Router from "next/router";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex items-center flex-col gap-2">
          <h2>Oops, there was a client-side error. Is your Destiny Manifest up-to-date?</h2>
          <button
          className="bg-gray-mantine-dark p-2 rounded-md font-bold text-sm hover:bg-gray-700"
            type="button"
            onClick={() => {
               this.setState({ hasError: false })
               manifestDb.manifest.clear()
               Router.reload()
            }}
          >
            Redownload Manifest
          </button>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
