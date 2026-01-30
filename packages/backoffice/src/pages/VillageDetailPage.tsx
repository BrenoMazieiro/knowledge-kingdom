import { useState } from 'react';
import { useParams } from 'react-router';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { PageHeader } from '@/components/molecules/PageHeader';
import { StatCard } from '@/components/molecules/StatCard';
import { OverviewSkeleton } from '@/components/molecules/OverviewSkeleton';
import { HousesTable } from '@/components/organisms/house/HousesTable';
import { CreateHouseDialog } from '@/components/organisms/house/CreateHouseDialog';
import { EditHouseDialog } from '@/components/organisms/house/EditHouseDialog';

const VILLAGE_OVERVIEW_QUERY = gql`
  query VillageOverview($villageId: ID!) {
    villageOverview(villageId: $villageId) {
      village {
        id name description
        kingdom { id name }
      }
      houseCount questionCount contentCount conquests badgesEarned
    }
  }
`;

const HOUSES_QUERY = gql`
  query Houses($villageId: ID!) {
    houses(villageId: $villageId) {
      id version name description visibility isFree entryPrice sortOrder createdAt
    }
  }
`;

const CREATE_HOUSE_MUTATION = gql`
  mutation CreateHouse($input: CreateHouseInput!) {
    createHouse(input: $input) { id }
  }
`;

const UPDATE_HOUSE_MUTATION = gql`
  mutation UpdateHouse($input: UpdateHouseInput!) {
    updateHouse(input: $input) { id version name description isFree entryPrice }
  }
`;

type VillageOverviewData = {
  villageOverview: {
    village: { id: string; name: string; description: string | null; kingdom: { id: string; name: string } };
    houseCount: number;
    questionCount: number;
    contentCount: number;
    conquests: number;
    badgesEarned: number;
  };
};

type House = {
  id: string;
  version: number;
  name: string;
  description: string | null;
  visibility: string;
  isFree: boolean;
  entryPrice: number | null;
  sortOrder: number;
  createdAt: string;
};

export const VillageDetailPage = () => {
  const { kingdomId, villageId } = useParams();
  const [createOpen, setCreateOpen] = useState(false);
  const [editHouse, setEditHouse] = useState<House | null>(null);

  const { data: overviewData, loading: overviewLoading } = useQuery<VillageOverviewData>(
    VILLAGE_OVERVIEW_QUERY, { variables: { villageId } },
  );
  const { data: housesData, loading: housesLoading } = useQuery<{ houses: House[] }>(
    HOUSES_QUERY, { variables: { villageId } },
  );
  const [createHouse, { loading: creating }] = useMutation(CREATE_HOUSE_MUTATION, {
    refetchQueries: ['Houses', 'VillageOverview'],
  });
  const [updateHouse, { loading: updating }] = useMutation(UPDATE_HOUSE_MUTATION, {
    refetchQueries: ['Houses', 'VillageOverview'],
  });

  const handleCreate = async (input: { name: string; description?: string; iconUrl?: string; visibility: string; isFree: boolean; entryPrice?: number }) => {
    await createHouse({ variables: { input: { villageId, ...input } } });
    setCreateOpen(false);
  };

  const handleUpdate = async (input: { id: string; version: number; name?: string; description?: string; iconUrl?: string; visibility?: string; isFree?: boolean; entryPrice?: number | null }) => {
    await updateHouse({ variables: { input } });
    setEditHouse(null);
  };

  if (overviewLoading || housesLoading) {
    return <OverviewSkeleton statCards={5} />;
  }

  const overview = overviewData?.villageOverview;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Kingdoms', href: '/kingdoms' },
        { label: overview?.village.kingdom.name ?? '', href: `/kingdoms/${kingdomId}` },
        { label: overview?.village.name ?? '' },
      ]} />
      <PageHeader
        title={overview?.village.name ?? ''}
        description={overview?.village.description ?? undefined}
      />
      <div className="grid gap-4 md:grid-cols-5">
        <StatCard label="Houses" value={overview?.houseCount ?? 0} />
        <StatCard label="Questions" value={overview?.questionCount ?? 0} />
        <StatCard label="Content" value={overview?.contentCount ?? 0} />
        <StatCard label="Conquests" value={overview?.conquests ?? 0} />
        <StatCard label="Badges" value={overview?.badgesEarned ?? 0} />
      </div>
      <HousesTable
        houses={housesData?.houses ?? []}
        kingdomId={kingdomId ?? ''}
        villageId={villageId ?? ''}
        onCreateClick={() => setCreateOpen(true)}
        onEditClick={setEditHouse}
      />
      <CreateHouseDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        loading={creating}
      />
      <EditHouseDialog
        open={editHouse !== null}
        onOpenChange={(open) => { if (!open) setEditHouse(null); }}
        house={editHouse}
        onSubmit={handleUpdate}
        loading={updating}
      />
    </div>
  );
};
