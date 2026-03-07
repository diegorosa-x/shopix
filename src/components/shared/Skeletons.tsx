export function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <div className="aspect-square animate-pulse bg-zinc-100" />
      <div className="space-y-3 p-4">
        <div className="flex justify-between">
          <div className="h-4 w-1/4 animate-pulse rounded bg-zinc-100" />
          <div className="h-4 w-1/6 animate-pulse rounded bg-zinc-100" />
        </div>
        <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-100" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-100" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-1/4 animate-pulse rounded bg-zinc-100" />
          <div className="h-8 w-8 animate-pulse rounded bg-zinc-100" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
