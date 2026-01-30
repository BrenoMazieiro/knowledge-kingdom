import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the message in a table cell', () => {
    render(
      <table>
        <tbody>
          <EmptyState colSpan={3} message="Nothing here" />
        </tbody>
      </table>,
    );
    const cell = screen.getByRole('cell');
    expect(cell).toHaveTextContent('Nothing here');
    expect(cell).toHaveAttribute('colspan', '3');
  });
});
