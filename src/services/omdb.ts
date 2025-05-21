export async function searchMovies(query: string, page: number = 1) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=24fcf5d3&s=${query}&page=${page}`);
  const data = await res.json();
  return data;
}

export async function getMovieDetails(imdbID: string) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=24fcf5d3&i=${imdbID}`);
  const data = await res.json();
  return data;
}