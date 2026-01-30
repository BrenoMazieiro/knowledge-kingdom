import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/atoms/card';
import { Skeleton } from '@/components/atoms/skeleton';

type DashboardStat = {
  title: string;
  description: string;
  value: string | number;
  href: string;
};

type DashboardCardsProps = {
  stats: DashboardStat[];
  loading: boolean;
};

export const DashboardCards = ({ stats, loading }: DashboardCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Link key={stat.href} to={stat.href}>
          <Card className="transition-colors hover:bg-accent">
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-2xl font-bold">{stat.value}</p>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
