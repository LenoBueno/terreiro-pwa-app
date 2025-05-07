
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/40">
          <div className="grid grid-cols-12 gap-4">
            <Skeleton className="h-4 col-span-1" />
            <Skeleton className="h-4 col-span-3" />
            <Skeleton className="h-4 col-span-3" />
            <Skeleton className="h-4 col-span-3" />
            <Skeleton className="h-4 col-span-2" />
          </div>
        </div>
        <div className="divide-y">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="p-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <Skeleton className="h-8 w-8 rounded-full col-span-1" />
                  <Skeleton className="h-4 col-span-3" />
                  <Skeleton className="h-4 col-span-3" />
                  <Skeleton className="h-4 col-span-3" />
                  <div className="col-span-2 flex justify-end space-x-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
