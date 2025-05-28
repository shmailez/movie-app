const apikey = process.env.NEXT_PUBLIC_APY_KEY

export async function searchMovies(query: string, page: number = 1) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${query}&page=${page}`);
  const data = await res.json();
  return data;
}

export async function getMovieDetails(imdbID: string) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${imdbID}`);
  const data = await res.json();
  return data;
}