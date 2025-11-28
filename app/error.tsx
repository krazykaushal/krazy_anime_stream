"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <AlertCircle className="h-20 w-20 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          We encountered an unexpected error. Don't worry, this has been logged
          and we'll look into it.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="w-full sm:w-auto"
          >
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/home")}
            className="w-full sm:w-auto"
          >
            Go to Home
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto max-h-40">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
