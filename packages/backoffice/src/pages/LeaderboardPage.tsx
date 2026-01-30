import { gql, useQuery } from '@apollo/client';
import { PageHeader } from '@/components/molecules/PageHeader';
import { TableSkeleton } from '@/components/molecules/TableSkeleton';
import { LeaderboardTable } from '@/components/organisms/leaderboard/LeaderboardTable';

const LEADERBOARD_QUERY = gql`
  query Leaderboard($limit: Int) {
    leaderboard(limit: $limit) { userId gameName totalQuills conquests badgesEarned rank }
  }
`;

type LeaderboardEntry = {
  userId: string;
  gameName: string;
  totalQuills: number;
  conquests: number;
  badgesEarned: number;
  rank: number;
};

export const LeaderboardPage = () => {
  const { data, loading } = useQuery<{ leaderboard: LeaderboardEntry[] }>(LEADERBOARD_QUERY, {
    variables: { limit: 25 },
  });

  if (loading) {
    return <TableSkeleton rows={10} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Leaderboard" />
      <LeaderboardTable entries={data?.leaderboard ?? []} />
    </div>
  );
};
