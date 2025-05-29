import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/services/omdb';

export function useMovies(query: string, page: number) {
  return useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => searchMovies(query, page),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
    enabled: !!query
  });
}
