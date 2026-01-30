import { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Button } from '@/components/atoms/button';
import { PageHeader } from '@/components/molecules/PageHeader';
import { TableSkeleton } from '@/components/molecules/TableSkeleton';
import { KingdomsTable } from '@/components/organisms/kingdom/KingdomsTable';
import { CreateKingdomDialog } from '@/components/organisms/kingdom/CreateKingdomDialog';
import { EditKingdomDialog } from '@/components/organisms/kingdom/EditKingdomDialog';
import type { Kingdom } from '@/components/organisms/kingdom/KingdomsTable';

const KINGDOMS_QUERY = gql`
  query Kingdoms {
    kingdoms {
      id
      version
      name
      description
      visibility
      status
      sortOrder
      createdAt
    }
  }
`;

const CREATE_KINGDOM_MUTATION = gql`
  mutation CreateKingdom($input: CreateKingdomInput!) {
    createKingdom(input: $input) { id }
  }
`;

const UPDATE_KINGDOM_MUTATION = gql`
  mutation UpdateKingdom($input: UpdateKingdomInput!) {
    updateKingdom(input: $input) { id }
  }
`;

const DELETE_KINGDOM_MUTATION = gql`
  mutation DeleteKingdom($id: ID!, $version: Int!) {
    deleteKingdom(id: $id, version: $version)
  }
`;

export const KingdomsPage = () => {
  const { data, loading } = useQuery<{ kingdoms: Kingdom[] }>(KINGDOMS_QUERY);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingKingdom, setEditingKingdom] = useState<Kingdom | null>(null);

  const [createKingdom, { loading: creating }] = useMutation(CREATE_KINGDOM_MUTATION, {
    refetchQueries: ['Kingdoms'],
  });
  const [updateKingdom, { loading: updating }] = useMutation(UPDATE_KINGDOM_MUTATION, {
    refetchQueries: ['Kingdoms'],
  });
  const [deleteKingdom] = useMutation(DELETE_KINGDOM_MUTATION, {
    refetchQueries: ['Kingdoms'],
  });

  const handleCreate = async (input: { name: string; description?: string; iconUrl?: string; visibility: string }) => {
    await createKingdom({ variables: { input } });
    setCreateOpen(false);
  };

  const handleEdit = async (input: { id: string; version: number; name: string; description?: string; iconUrl?: string; visibility?: string }) => {
    await updateKingdom({ variables: { input } });
    setEditOpen(false);
    setEditingKingdom(null);
  };

  const handleDelete = async (kingdom: Kingdom) => {
    await deleteKingdom({ variables: { id: kingdom.id, version: kingdom.version } });
  };

  const openEdit = (kingdom: Kingdom) => {
    setEditingKingdom(kingdom);
    setEditOpen(true);
  };

  if (loading) {
    return <TableSkeleton headerAction />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kingdoms"
        action={<Button onClick={() => setCreateOpen(true)}>Create Kingdom</Button>}
      />
      <KingdomsTable
        kingdoms={data?.kingdoms ?? []}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
      <CreateKingdomDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        loading={creating}
      />
      <EditKingdomDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        kingdom={editingKingdom}
        onSubmit={handleEdit}
        loading={updating}
      />
    </div>
  );
};
