export async function searchMovies(query: string, page: number = 1) {
  const res = await fetch(`/api/movie/search?q=${encodeURIComponent(query)}&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}

export async function getMovieDetails(imdbID: string) {
  const res = await fetch(`/api/movie/details?id=${encodeURIComponent(imdbID)}`);
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
}
