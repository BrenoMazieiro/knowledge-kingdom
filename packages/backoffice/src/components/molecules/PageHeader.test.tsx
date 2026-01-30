import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('renders the title', () => {
    render(<PageHeader title="My Title" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('My Title');
  });

  it('renders the description when provided', () => {
    render(<PageHeader title="T" description="Some description" />);
    expect(screen.getByText('Some description')).toBeInTheDocument();
  });

  it('does not render a description paragraph when omitted', () => {
    const { container } = render(<PageHeader title="T" />);
    expect(container.querySelector('p')).toBeNull();
  });

  it('renders the action slot when provided', () => {
    render(<PageHeader title="T" action={<button>Click</button>} />);
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });
});
