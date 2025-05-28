'use client';
import { useEffect, useState } from 'react';
import { getFavorites } from '@/lib/favorites';
import { getMovieDetails } from '@/services/omdb';
import { Spinner } from '@/components/Spinner';
import { MovieCard } from '@/components/MovieCard';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = getFavorites();
    setFavorites(ids);

    const fetchMovies = async () => {
      setLoading(true);
      const results = await Promise.all(ids.map(id => getMovieDetails(id)));
      setMovies(results);
      setLoading(false);
    };

    if (ids.length > 0) {
      fetchMovies();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <main className="p-4 max-w-5xl mx-auto">
    <h2 className="text-2xl font-bold mb-4 mt-4 text-center">Избранное</h2>
        <Link href="/" className="text-blue-200 hover:underline text-sm absolute left-4 top-20">
            На главную
        </Link>
      {loading ? (
        <div className="flex justify-center"><Spinner/></div>
      ) : favorites.length === 0 ? (
        <p className="text-center text-gray-500">Нет избранных фильмов</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}</main>
      
    
  );
}
