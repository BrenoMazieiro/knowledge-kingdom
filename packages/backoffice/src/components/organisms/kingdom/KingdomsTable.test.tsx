import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { renderWithRouter } from '@/test/renderWithRouter';
import { KingdomsTable } from './KingdomsTable';

const kingdoms = [
  { id: '1', version: 1, name: 'Math Kingdom', description: 'Learn math', visibility: 'PUBLIC', status: 'ACTIVE', sortOrder: 1, createdAt: '2024-01-01T00:00:00Z' },
  { id: '2', version: 1, name: 'Science Kingdom', description: null, visibility: 'PRIVATE', status: 'PENDING_REVIEW', sortOrder: 2, createdAt: '2024-02-01T00:00:00Z' },
];

describe('KingdomsTable', () => {
  it('renders kingdom rows', () => {
    renderWithRouter(<KingdomsTable kingdoms={kingdoms} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Math Kingdom')).toBeInTheDocument();
    expect(screen.getByText('Science Kingdom')).toBeInTheDocument();
  });

  it('renders kingdom names as links', () => {
    renderWithRouter(<KingdomsTable kingdoms={kingdoms} onEdit={vi.fn()} onDelete={vi.fn()} />);
    const link = screen.getByRole('link', { name: 'Math Kingdom' });
    expect(link).toHaveAttribute('href', '/kingdoms/1');
  });

  it('shows dash for null description', () => {
    renderWithRouter(<KingdomsTable kingdoms={kingdoms} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Learn math')).toBeInTheDocument();
    expect(screen.getAllByText('-')).toHaveLength(1);
  });

  it('shows empty state when no kingdoms', () => {
    renderWithRouter(<KingdomsTable kingdoms={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/no kingdoms found/i)).toBeInTheDocument();
  });

  it('renders status and visibility badges', () => {
    renderWithRouter(<KingdomsTable kingdoms={kingdoms} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();
    expect(screen.getByText('PENDING_REVIEW')).toBeInTheDocument();
    expect(screen.getByText('PUBLIC')).toBeInTheDocument();
    expect(screen.getByText('PRIVATE')).toBeInTheDocument();
  });

  it('calls onEdit when edit button clicked', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderWithRouter(<KingdomsTable kingdoms={kingdoms} onEdit={onEdit} onDelete={vi.fn()} />);

    const editButtons = screen.getAllByRole('button', { name: 'Edit' });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await user.click(editButtons[0]!);
    expect(onEdit).toHaveBeenCalledWith(kingdoms[0]);
  });

  it('calls onDelete when delete button clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    renderWithRouter(<KingdomsTable kingdoms={kingdoms} onEdit={vi.fn()} onDelete={onDelete} />);

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await user.click(deleteButtons[1]!);
    expect(onDelete).toHaveBeenCalledWith(kingdoms[1]);
  });
});
