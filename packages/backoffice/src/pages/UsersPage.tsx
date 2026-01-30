import { gql, useQuery } from '@apollo/client';
import { PageHeader } from '@/components/molecules/PageHeader';
import { TableSkeleton } from '@/components/molecules/TableSkeleton';
import { UsersTable } from '@/components/organisms/user/UsersTable';

const USERS_QUERY = gql`
  query Users {
    users { id email name gameName emailVerified createdAt }
  }
`;

type User = {
  id: string;
  email: string;
  name: string;
  gameName: string;
  emailVerified: boolean;
  createdAt: string;
};

export const UsersPage = () => {
  const { data, loading } = useQuery<{ users: User[] }>(USERS_QUERY);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Users" />
      <UsersTable users={data?.users ?? []} />
    </div>
  );
};
