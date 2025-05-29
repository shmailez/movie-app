// const apikey = process.env.NEXT_PUBLIC_APY_KEY

// export async function searchMovies(query: string, page: number = 1) {
//   const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${query}&page=${page}`);
//   const data = await res.json();
//   return data;
// }

// export async function getMovieDetails(imdbID: string) {
//   const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${imdbID}`);
//   const data = await res.json();
//   return data;
// }

////
export async function searchMovies(query: string, page: number = 1) {
  const res = await fetch(`/api/movie/search?q=${encodeURIComponent(query)}&page=${page}`);
  console.log('res', res)
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}

export async function getMovieDetails(imdbID: string) {
  const res = await fetch(`/api/movie/details?id=${encodeURIComponent(imdbID)}`);
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
}
