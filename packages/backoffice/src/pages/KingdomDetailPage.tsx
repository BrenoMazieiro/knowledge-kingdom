import { useState } from 'react';
import { useParams } from 'react-router';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { PageHeader } from '@/components/molecules/PageHeader';
import { StatCard } from '@/components/molecules/StatCard';
import { OverviewSkeleton } from '@/components/molecules/OverviewSkeleton';
import { VillagesTable } from '@/components/organisms/kingdom/VillagesTable';
import { CreateVillageDialog } from '@/components/organisms/kingdom/CreateVillageDialog';
import { EditVillageDialog } from '@/components/organisms/kingdom/EditVillageDialog';

const KINGDOM_OVERVIEW_QUERY = gql`
  query KingdomOverview($kingdomId: ID!) {
    kingdomOverview(kingdomId: $kingdomId) {
      kingdom { id name description }
      villageCount
      houseCount
      questionCount
      contentCount
    }
  }
`;

const VILLAGES_QUERY = gql`
  query Villages($kingdomId: ID!) {
    villages(kingdomId: $kingdomId) {
      id version name description visibility status sortOrder createdAt
    }
  }
`;

const CREATE_VILLAGE_MUTATION = gql`
  mutation CreateVillage($input: CreateVillageInput!) {
    createVillage(input: $input) { id }
  }
`;

const UPDATE_VILLAGE_MUTATION = gql`
  mutation UpdateVillage($input: UpdateVillageInput!) {
    updateVillage(input: $input) { id version name description }
  }
`;

type KingdomOverviewData = {
  kingdomOverview: {
    kingdom: { id: string; name: string; description: string | null };
    villageCount: number;
    houseCount: number;
    questionCount: number;
    contentCount: number;
  };
};

type Village = {
  id: string;
  version: number;
  name: string;
  description: string | null;
  visibility: string;
  status: string;
  sortOrder: number;
  createdAt: string;
};

export const KingdomDetailPage = () => {
  const { kingdomId } = useParams();
  const [createOpen, setCreateOpen] = useState(false);
  const [editVillage, setEditVillage] = useState<Village | null>(null);

  const { data: overviewData, loading: overviewLoading } = useQuery<KingdomOverviewData>(
    KINGDOM_OVERVIEW_QUERY,
    { variables: { kingdomId } },
  );
  const { data: villagesData, loading: villagesLoading } = useQuery<{ villages: Village[] }>(
    VILLAGES_QUERY,
    { variables: { kingdomId } },
  );
  const [createVillage, { loading: creating }] = useMutation(CREATE_VILLAGE_MUTATION, {
    refetchQueries: ['Villages', 'KingdomOverview'],
  });
  const [updateVillage, { loading: updating }] = useMutation(UPDATE_VILLAGE_MUTATION, {
    refetchQueries: ['Villages', 'KingdomOverview'],
  });

  const handleCreate = async (input: { name: string; description?: string; iconUrl?: string; visibility: string }) => {
    await createVillage({ variables: { input: { kingdomId, ...input } } });
    setCreateOpen(false);
  };

  const handleUpdate = async (input: { id: string; version: number; name: string; description?: string; iconUrl?: string; visibility?: string }) => {
    await updateVillage({ variables: { input } });
    setEditVillage(null);
  };

  if (overviewLoading || villagesLoading) {
    return <OverviewSkeleton statCards={4} />;
  }

  const overview = overviewData?.kingdomOverview;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Kingdoms', href: '/kingdoms' },
        { label: overview?.kingdom.name ?? '' },
      ]} />
      <PageHeader
        title={overview?.kingdom.name ?? ''}
        description={overview?.kingdom.description ?? undefined}
      />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Villages" value={overview?.villageCount ?? 0} />
        <StatCard label="Houses" value={overview?.houseCount ?? 0} />
        <StatCard label="Questions" value={overview?.questionCount ?? 0} />
        <StatCard label="Content" value={overview?.contentCount ?? 0} />
      </div>
      <VillagesTable
        villages={villagesData?.villages ?? []}
        kingdomId={kingdomId ?? ''}
        onCreateClick={() => setCreateOpen(true)}
        onEditClick={setEditVillage}
      />
      <CreateVillageDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        loading={creating}
      />
      <EditVillageDialog
        open={editVillage !== null}
        onOpenChange={(open) => { if (!open) setEditVillage(null); }}
        village={editVillage}
        onSubmit={handleUpdate}
        loading={updating}
      />
    </div>
  );
};
