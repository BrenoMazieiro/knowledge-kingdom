import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OverviewSkeleton } from './OverviewSkeleton';

describe('OverviewSkeleton', () => {
  it('renders the default number of skeleton cards (4)', () => {
    const { container } = render(<OverviewSkeleton />);
    const grid = container.querySelector('.grid');
    expect(grid?.children).toHaveLength(4);
  });

  it('renders a custom number of skeleton cards', () => {
    const { container } = render(<OverviewSkeleton statCards={3} />);
    const grid = container.querySelector('.grid');
    expect(grid?.children).toHaveLength(3);
  });
});
