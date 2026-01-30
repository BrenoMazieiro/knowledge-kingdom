import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './useAuth';

export const useRequireAuth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin', { replace: true });
    }
  }, [user, loading, navigate]);

  return { user, loading };
};
