import type { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../config/apollo';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { Toaster } from '../components/molecules/Toaster';

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};
