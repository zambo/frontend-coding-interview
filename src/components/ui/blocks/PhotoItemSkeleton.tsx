export function PhotoItemSkeleton() {
  return (
    <div className="flex w-full gap-4 animate-pulse">
      <div className="w-5">
        <div className="h-5 w-5 bg-gray-200 rounded" />
      </div>
      <div className="size-[75px] aspect-square relative bg-gray-200 rounded" />
      <div className="flex-grow space-y-2">
        <div className="flex items-center gap-2 justify-between">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="size-3 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function PhotoGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <PhotoItemSkeleton key={index} />
      ))}
    </div>
  );
}
