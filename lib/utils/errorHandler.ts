import axios from "axios";

export interface ErrorResponse {
  message: string;
  userMessage: string;
  statusCode?: number;
}

/**
 * Parse and format errors for user display
 */
export function handleApiError(error: unknown): ErrorResponse {
  // Handle Axios errors
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      const statusCode = error.response.status;
      let userMessage = "Something went wrong. Please try again.";

      switch (statusCode) {
        case 400:
          userMessage = "Invalid request. Please check your input.";
          break;
        case 401:
          userMessage = "Authentication required. Please log in.";
          break;
        case 403:
          userMessage = "You don't have permission to access this resource.";
          break;
        case 404:
          userMessage = "The requested content was not found.";
          break;
        case 429:
          userMessage = "Too many requests. Please try again later.";
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          userMessage = "Server error. Our team has been notified.";
          break;
      }

      return {
        message: error.message,
        userMessage,
        statusCode,
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: "No response from server",
        userMessage:
          "Unable to connect to the server. Please check your internet connection.",
      };
    } else if (error.code === "ECONNABORTED") {
      // Timeout
      return {
        message: "Request timeout",
        userMessage: "The request took too long. Please try again.",
      };
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return {
      message: error.message,
      userMessage: error.message || "An unexpected error occurred.",
    };
  }

  // Unknown error type
  return {
    message: "Unknown error",
    userMessage: "An unexpected error occurred. Please try again.",
  };
}

/**
 * Log errors for debugging
 */
export function logError(error: unknown, context?: string): void {
  const timestamp = new Date().toISOString();
  const errorInfo = handleApiError(error);

  console.error(`[${timestamp}] Error${context ? ` in ${context}` : ""}:`, {
    message: errorInfo.message,
    statusCode: errorInfo.statusCode,
    originalError: error,
  });

  // In production, you might want to send this to an error tracking service
  // like Sentry, LogRocket, etc.
}
