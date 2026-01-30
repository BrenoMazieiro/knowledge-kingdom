import { gql, useQuery } from '@apollo/client';
import { Skeleton } from '@/components/atoms/skeleton';
import { PageHeader } from '@/components/molecules/PageHeader';
import { BadgeGrid } from '@/components/organisms/badge/BadgeGrid';

const MY_BADGES_QUERY = gql`
  query MyBadges {
    myBadges {
      id playerId badgeType scopeType scopeId quillsEarned earnedAt
    }
  }
`;

type PlayerBadge = {
  id: string;
  playerId: string;
  badgeType: string;
  scopeType: string;
  scopeId: string | null;
  quillsEarned: number;
  earnedAt: string;
};

export const BadgesPage = () => {
  const { data, loading } = useQuery<{ myBadges: PlayerBadge[] }>(MY_BADGES_QUERY);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-32" />
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-7 w-24" />
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-40 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Badges" />
      <BadgeGrid badges={data?.myBadges ?? []} />
    </div>
  );
};
