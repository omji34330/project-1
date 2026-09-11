interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-lg bg-night-500/10 dark:bg-white/10 ${className}`} />;
}

export function KpiSkeletonRow({ count = 5 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass flex flex-col gap-4 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-9 rounded-lg" />
          </div>
          <Skeleton className="h-9 w-20" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton({ heightClass = 'h-72' }: { heightClass?: string }) {
  return (
    <div className={`glass rounded-2xl p-6 ${heightClass}`}>
      <Skeleton className="h-4 w-32 mb-6" />
      <Skeleton className="h-[calc(100%-2rem)] w-full" />
    </div>
  );
}
