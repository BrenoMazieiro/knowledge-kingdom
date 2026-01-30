import { createContext, useMemo, type ReactNode } from 'react';
import { gql, useQuery } from '@apollo/client';

const BM_ME_QUERY = gql`
  query BMMe {
    bmMe {
      id
      email
      name
      permissionLevel
    }
  }
`;

type User = {
  id: string;
  email: string;
  name: string;
  permissionLevel: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  refetch: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  refetch: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data, loading, refetch } = useQuery(BM_ME_QUERY, {
    errorPolicy: 'ignore',
  });

  const value = useMemo(
    () => ({
      user: (data?.bmMe as User) ?? null,
      loading,
      refetch,
    }),
    [data, loading, refetch],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
};
