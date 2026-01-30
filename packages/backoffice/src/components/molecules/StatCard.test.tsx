import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders the label and numeric value', () => {
    render(<StatCard label="Villages" value={42} />);
    expect(screen.getByText('Villages')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders a string value', () => {
    render(<StatCard label="Status" value="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders zero value', () => {
    render(<StatCard label="Empty" value={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
