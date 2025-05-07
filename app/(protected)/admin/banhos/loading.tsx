
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />

      <Skeleton className="h-10 w-full" />

      <div className="flex border-b space-x-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="rounded-md border border-gray-200 p-4">
              <Skeleton className="h-6 w-full mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-6" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
