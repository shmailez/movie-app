'use client';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '@/components/SearchBar';
import { MovieGrid } from '@/components/MovieGrid';
import { Spinner } from '@/components/Spinner';
import { EmptyState } from '@/components/EmptyState';
import { searchMovies } from '@/services/omdb';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('Batman');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => searchMovies(query, page),
    placeholderData: previousData => previousData, // сохраняет предыдущие данные при смене страницы
    staleTime: 1000 * 60 * 5, // кэш актуален 5 минут
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    refetch();
  };

  const movies = data?.Search || [];
  const empty = data?.Response === 'False';
  const totalResults = parseInt(data?.totalResults || '0', 10);
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <SearchBar onSearch={handleSearch} />
      {isLoading ? <Spinner /> : empty ? <EmptyState /> : <MovieGrid movies={movies} />}

      {!isLoading && !empty && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300  text-gray-700 rounded disabled:opacity-50"
          >
            Назад
          </button>
          <span className="px-4 py-2">Страница {page} из {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Вперёд
          </button>
        </div>
      )}
    </main>
  );
}
