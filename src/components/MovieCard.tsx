// 'use client';
// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getMovieDetails } from '@/lib/omdb';

// export function MovieCard({ movie }: { movie: any }) {
//   const [showPopup, setShowPopup] = useState(false);

//   const { data: details } = useQuery({
//     queryKey: ['movie', movie.imdbID],
//     queryFn: () => getMovieDetails(movie.imdbID),
//     enabled: showPopup, // загружаем только при открытии
//     staleTime: 1000 * 60 * 10, // кэш актуален 10 минут
//   });

//   return (
//     <div className="relative">
//       <div onClick={() => setShowPopup(true)} className="border rounded shadow p-2 cursor-pointer">
//         <img
//           src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpeg'}
//           alt={movie.Title}
//           className="w-full h-64 object-cover mb-2 rounded"
//         />
//         <h3 className="font-bold text-lg">{movie.Title}</h3>
//         <p>{movie.Year}</p>
//       </div>

//       {showPopup && details && (
//         <div className="absolute overflow-scroll inset-0 bg-white border rounded shadow-lg p-4 z-10">
//           <button
//             onClick={() => setShowPopup(false)}
//             className="absolute top-1 right-1 text-gray-500 hover:text-black"
//           >
//             ×
//           </button>
//           <h3 className="text-lg font-bold mb-1">{details.Title} ({details.Year})</h3>
//           <p className="text-sm italic mb-2">{details.Genre} — {details.Runtime}</p>
//           <p className="text-sm mb-2">IMDb: {details.imdbRating}</p>
//           <p className="text-sm text-gray-700">{details.Plot}</p>
//         </div>
//       )}
//     </div>
//   );
// }


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
      <div onClick={() => setShowPopup(true)} className="h-full border rounded shadow p-4 cursor-pointer">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpeg'}
          alt={movie.Title}
          className="w-full h-64 object-cover mb-2 rounded"
        />
        <h3 className="font-bold text-lg flex justify-between items-center">
          {movie.Title}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite();
            }}
            className={`ml-2 text-xl ${favorite ? 'text-red-500' : 'text-gray-400'}`}
            title="Добавить в закладки"
          >
            ♥
          </button>
        </h3>
        <p>{movie.Year}</p>
      </div>

      {showPopup && details && (
        <div className="absolute overflow-scroll inset-0 bg-gray-400 border rounded shadow-lg p-4 z-9">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-1 right-1 text-gray-500 hover:text-black"
          >
            ×
          </button>
          <h3 className="text-lg font-bold mb-1">{details.Title} ({details.Year})</h3>
          <p className="text-sm italic mb-2">{details.Genre} — {details.Runtime}</p>
          <p className="text-sm mb-2">IMDb: {details.imdbRating}</p>
          <p className="text-sm text-gray-700">{details.Plot}</p>
        </div>
      )}
    </div>
  );
}