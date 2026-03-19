import { useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useSocialStore } from '@/store/socialStore';

export const useCurrentUser = () => {
  const authUser = useAuthStore((s) => s.user);
  const users = useSocialStore((s) => s.users);

  return useMemo(() => {
    if (!authUser) return null;
    return users.find((u) => u.id === authUser.id) ?? authUser;
  }, [authUser, users]);
};
