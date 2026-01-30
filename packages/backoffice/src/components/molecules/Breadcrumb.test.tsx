import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithRouter } from '@/test/renderWithRouter';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders all items', () => {
    renderWithRouter(
      <Breadcrumb items={[
        { label: 'Kingdoms', href: '/kingdoms' },
        { label: 'Math' },
      ]} />,
    );
    expect(screen.getByText('Kingdoms')).toBeInTheDocument();
    expect(screen.getByText('Math')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: 'Kingdoms', href: '/kingdoms' }, { label: 'Current' }]} />,
    );
    const link = screen.getByRole('link', { name: 'Kingdoms' });
    expect(link).toHaveAttribute('href', '/kingdoms');
  });

  it('renders plain text for the last item without href', () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: 'Kingdoms', href: '/kingdoms' }, { label: 'Current' }]} />,
    );
    expect(screen.queryByRole('link', { name: 'Current' })).toBeNull();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('renders separator between items', () => {
    renderWithRouter(
      <Breadcrumb items={[{ label: 'A', href: '/a' }, { label: 'B' }]} />,
    );
    expect(screen.getByText('/')).toBeInTheDocument();
  });
});
