import { Card, CardContent } from '@/components/atoms/card';
import { Skeleton } from '@/components/atoms/skeleton';

type TableSkeletonProps = {
  rows?: number;
  headerAction?: boolean;
};

export const TableSkeleton = ({ rows = 5, headerAction = false }: TableSkeletonProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-48" />
        {headerAction && <Skeleton className="h-9 w-36" />}
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array.from({ length: rows }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
