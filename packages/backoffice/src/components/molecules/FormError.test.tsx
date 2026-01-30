import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormError } from './FormError';

describe('FormError', () => {
  it('renders the error message', () => {
    render(<FormError message="Email is required" />);
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});
