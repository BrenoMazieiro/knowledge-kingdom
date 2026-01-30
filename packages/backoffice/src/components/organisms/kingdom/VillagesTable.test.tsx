import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { renderWithRouter } from '@/test/renderWithRouter';
import { VillagesTable } from './VillagesTable';

const villages = [
  { id: 'v1', version: 1, name: 'Algebra', description: 'Basic algebra', visibility: 'PUBLIC', status: 'ACTIVE', sortOrder: 1, createdAt: '2024-01-01T00:00:00Z' },
  { id: 'v2', version: 1, name: 'Geometry', description: null, visibility: 'PRIVATE', status: 'PENDING_REVIEW', sortOrder: 2, createdAt: '2024-02-01T00:00:00Z' },
];

describe('VillagesTable', () => {
  it('renders village rows with links', () => {
    renderWithRouter(
      <VillagesTable villages={villages} kingdomId="k1" onCreateClick={vi.fn()} />,
    );
    const link = screen.getByRole('link', { name: 'Algebra' });
    expect(link).toHaveAttribute('href', '/kingdoms/k1/villages/v1');
  });

  it('shows empty state when no villages', () => {
    renderWithRouter(
      <VillagesTable villages={[]} kingdomId="k1" onCreateClick={vi.fn()} />,
    );
    expect(screen.getByText(/no villages yet/i)).toBeInTheDocument();
  });

  it('renders status and visibility badges', () => {
    renderWithRouter(
      <VillagesTable villages={villages} kingdomId="k1" onCreateClick={vi.fn()} />,
    );
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();
    expect(screen.getByText('PENDING_REVIEW')).toBeInTheDocument();
    expect(screen.getByText('PUBLIC')).toBeInTheDocument();
    expect(screen.getByText('PRIVATE')).toBeInTheDocument();
  });

  it('calls onCreateClick when create button clicked', async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();
    renderWithRouter(
      <VillagesTable villages={villages} kingdomId="k1" onCreateClick={onCreate} />,
    );
    await user.click(screen.getByRole('button', { name: /create village/i }));
    expect(onCreate).toHaveBeenCalled();
  });

  it('renders edit buttons when onEditClick is provided', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderWithRouter(
      <VillagesTable villages={villages} kingdomId="k1" onCreateClick={vi.fn()} onEditClick={onEdit} />,
    );
    const editButtons = screen.getAllByRole('button', { name: 'Edit' });
    expect(editButtons).toHaveLength(2);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await user.click(editButtons[0]!);
    expect(onEdit).toHaveBeenCalledWith(villages[0]);
  });

  it('does not render edit buttons when onEditClick is omitted', () => {
    renderWithRouter(
      <VillagesTable villages={villages} kingdomId="k1" onCreateClick={vi.fn()} />,
    );
    expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull();
  });
});
