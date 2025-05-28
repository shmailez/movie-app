import Link from 'next/link';
import { MovieCard } from './MovieCard';

export function MovieGrid({ movies }: { movies: any[] }) {
  return (
    <div className="grid grid-cols-2 mt-10 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <Link href="/favorites" className="text-blue-200 hover:underline text-sm absolute right-20 top-34">
          Избранные фильмы
        </Link>
      {movies.map((m) => (
        <MovieCard key={m.imdbID} movie={m} />
      ))}
    </div>
  );
}