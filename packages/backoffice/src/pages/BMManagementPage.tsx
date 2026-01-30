import { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Button } from '@/components/atoms/button';
import { PageHeader } from '@/components/molecules/PageHeader';
import { TableSkeleton } from '@/components/molecules/TableSkeleton';
import { BMTable } from '@/components/organisms/bm/BMTable';
import { InviteBMDialog } from '@/components/organisms/bm/InviteBMDialog';
import { usePermission } from '@/hooks/usePermission';

const BM_QUERY = gql`
  query BackofficeManagers {
    backofficeManagers {
      id email name permissionLevel createdAt
    }
  }
`;

const INVITE_BM_MUTATION = gql`
  mutation InviteBM($input: InviteBMInput!) {
    inviteBM(input: $input) { id }
  }
`;

type BackofficeManager = {
  id: string;
  email: string;
  name: string;
  permissionLevel: string;
  createdAt: string;
};

export const BMManagementPage = () => {
  const { isAdmin } = usePermission();
  const [inviteOpen, setInviteOpen] = useState(false);
  const { data, loading } = useQuery<{ backofficeManagers: BackofficeManager[] }>(BM_QUERY);
  const [inviteBM, { loading: inviting }] = useMutation(INVITE_BM_MUTATION, {
    refetchQueries: ['BackofficeManagers'],
  });

  const handleInvite = async (input: { email: string; name: string; permissionLevel: string }) => {
    await inviteBM({ variables: { input } });
    setInviteOpen(false);
  };

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Managers"
        action={
          isAdmin ? (
            <Button onClick={() => setInviteOpen(true)}>Invite Manager</Button>
          ) : undefined
        }
      />
      <BMTable managers={data?.backofficeManagers ?? []} />
      <InviteBMDialog
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        onSubmit={handleInvite}
        loading={inviting}
      />
    </div>
  );
};
