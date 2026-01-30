import { Skeleton } from '@/components/atoms/skeleton';

type OverviewSkeletonProps = {
  statCards?: number;
};

export const OverviewSkeleton = ({ statCards = 4 }: OverviewSkeletonProps) => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-9 w-64" />
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: statCards }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
      <Skeleton className="h-64 w-full" />
    </div>
  );
};
