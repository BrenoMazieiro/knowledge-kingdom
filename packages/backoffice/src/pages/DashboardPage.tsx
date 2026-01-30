import { gql, useQuery } from '@apollo/client';
import { useAuth } from '../hooks/useAuth';
import { PageHeader } from '@/components/molecules/PageHeader';
import { DashboardCards } from '@/components/organisms/dashboard/DashboardCards';

const DASHBOARD_QUERY = gql`
  query Dashboard {
    kingdoms { id }
    users { id }
    leaderboard(limit: 1) { totalQuills }
  }
`;

type DashboardData = {
  kingdoms: { id: string }[];
  users: { id: string }[];
  leaderboard: { totalQuills: number }[];
};

export const DashboardPage = () => {
  const { user } = useAuth();
  const { data, loading } = useQuery<DashboardData>(DASHBOARD_QUERY);

  const stats = [
    {
      title: 'Kingdoms',
      description: 'Manage knowledge domains',
      value: data?.kingdoms.length ?? 0,
      href: '/kingdoms',
    },
    {
      title: 'Users',
      description: 'Registered players',
      value: data?.users.length ?? 0,
      href: '/users',
    },
    {
      title: 'Top Quills',
      description: 'Leading player quills',
      value: data?.leaderboard[0]?.totalQuills != null
        ? `${data.leaderboard[0].totalQuills.toLocaleString()} Quills`
        : '0 Quills',
      href: '/leaderboard',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome, ${user?.name}`}
        description="Backoffice management portal."
      />
      <DashboardCards stats={stats} loading={loading} />
    </div>
  );
};
