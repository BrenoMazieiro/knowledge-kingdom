import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { renderWithRouter } from '@/test/renderWithRouter';
import { HousesTable } from './HousesTable';

const houses = [
  { id: 'h1', version: 1, name: 'Intro', description: 'Intro module', visibility: 'PUBLIC', isFree: true, entryPrice: null, sortOrder: 1, createdAt: '2024-01-01T00:00:00Z' },
  { id: 'h2', version: 1, name: 'Advanced', description: null, visibility: 'PRIVATE', isFree: false, entryPrice: 500, sortOrder: 2, createdAt: '2024-02-01T00:00:00Z' },
];

describe('HousesTable', () => {
  it('renders house rows with links', () => {
    renderWithRouter(
      <HousesTable houses={houses} kingdomId="k1" villageId="v1" onCreateClick={vi.fn()} />,
    );
    const link = screen.getByRole('link', { name: 'Intro' });
    expect(link).toHaveAttribute('href', '/kingdoms/k1/villages/v1/houses/h1');
  });

  it('displays free/paid status and entry price', () => {
    renderWithRouter(
      <HousesTable houses={houses} kingdomId="k1" villageId="v1" onCreateClick={vi.fn()} />,
    );
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('500 Quills')).toBeInTheDocument();
  });

  it('shows empty state when no houses', () => {
    renderWithRouter(
      <HousesTable houses={[]} kingdomId="k1" villageId="v1" onCreateClick={vi.fn()} />,
    );
    expect(screen.getByText(/no houses yet/i)).toBeInTheDocument();
  });

  it('calls onCreateClick when create button clicked', async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();
    renderWithRouter(
      <HousesTable houses={houses} kingdomId="k1" villageId="v1" onCreateClick={onCreate} />,
    );
    await user.click(screen.getByRole('button', { name: /create house/i }));
    expect(onCreate).toHaveBeenCalled();
  });

  it('renders edit buttons when onEditClick is provided', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderWithRouter(
      <HousesTable houses={houses} kingdomId="k1" villageId="v1" onCreateClick={vi.fn()} onEditClick={onEdit} />,
    );
    const editButtons = screen.getAllByRole('button', { name: 'Edit' });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await user.click(editButtons[1]!);
    expect(onEdit).toHaveBeenCalledWith(houses[1]);
  });
});
