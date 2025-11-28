import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6 mt-10 p-4">
      {/* Hero section skeleton */}
      <div className="flex justify-around flex-col md:flex-row">
        <div className="md:w-[40%] m-4">
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-12 w-full mb-3" />
          <Skeleton className="h-10 w-32 mx-auto" />
        </div>
        <div className="md:w-[40%] m-4">
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>

      {/* Carousels skeleton */}
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-10 w-64 ml-5" />
            <div className="flex gap-4 overflow-hidden px-5">
              {[1, 2, 3, 4, 5].map((j) => (
                <Skeleton key={j} className="h-64 w-48 flex-shrink-0 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
