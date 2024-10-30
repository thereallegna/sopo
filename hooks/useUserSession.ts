import { useQuery } from '@tanstack/react-query';
import { SESSION_USER } from '@constants/queryKey';
import { fetchUserSession } from '@services/fetcher/auth/session';

// Custom hook using react-query
export const useUserSession = () => {
  const data = useQuery({
    queryKey: [SESSION_USER],
    queryFn: fetchUserSession,
  });

  return data;
};
