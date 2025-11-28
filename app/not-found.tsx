import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <FileQuestion className="h-20 w-20 text-gray-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center">
          <Link href="/home">
            <Button className="w-full sm:w-auto">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
