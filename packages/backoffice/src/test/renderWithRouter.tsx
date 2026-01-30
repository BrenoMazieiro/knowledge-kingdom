import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { ReactElement, ReactNode } from 'react';

const RouterWrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

export const renderWithRouter = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: RouterWrapper, ...options });
