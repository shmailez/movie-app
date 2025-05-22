'use client';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '@/services/omdb';
import { toggleFavorite, isFavorite } from '@/lib/favorites';

export function MovieCard({ movie }: { movie: any }) {
  const [showPopup, setShowPopup] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(movie.imdbID));
  }, [movie.imdbID]);

  const { data: details } = useQuery({
    queryKey: ['movie', movie.imdbID],
    queryFn: () => getMovieDetails(movie.imdbID),
    enabled: showPopup,
    staleTime: 1000 * 60 * 10,
  });

  const handleToggleFavorite = () => {
    toggleFavorite(movie.imdbID);
    setFavorite((prev) => !prev);
  };

  return (
    <div className="relative">
      <div onClick={() => setShowPopup(true)} className="h-full rounded shadow p-4 cursor-pointer">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpeg'}
          alt={movie.Title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.jpeg';
          }}
          className="w-full h-64 object-cover mb-2 rounded"
        />
        <h3 className="font-bold text-lg flex justify-between items-center mt-2">
          {movie.Title}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite();
            }}
            className={`ml-2 text-3xl ${favorite ? 'text-red-600' : 'text-gray-500'}`}
            title="Добавить в закладки"
          >
            ♥
          </button>
        </h3>
        <p>{movie.Year}</p>
        <p className='opacity-50'>{movie.Type}</p>
      </div>

      {showPopup && details && (
        <div className="absolute overflow-scroll no-scrollbar inset-0 bg-violet-600 text-white rounded shadow-lg p-4 z-9">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute text-2xl font-bold top-1 right-2 hover:text-black"
          >
            ×
          </button>
          <h3 className="text-lg font-bold mb-1 mt-5">{details.Title} ({details.Year})</h3>
          <p className="text-sm italic mb-2">{details.Genre} — {details.Runtime}</p>
          <p className="text-sm mb-2">IMDb: {details.imdbRating}</p>
          <p className="text-sm">{details.Plot}</p>
        </div>
      )}
    </div>
  );
}