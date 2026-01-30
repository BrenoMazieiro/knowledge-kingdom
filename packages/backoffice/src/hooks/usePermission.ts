import { useAuth } from './useAuth';

export const usePermission = () => {
  const { user } = useAuth();
  const level = user?.permissionLevel ?? '';

  return {
    canView: level === 'VIEWER' || level === 'EDITOR' || level === 'ADMIN',
    canEdit: level === 'EDITOR' || level === 'ADMIN',
    isAdmin: level === 'ADMIN',
  };
};
