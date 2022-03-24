import { Movies } from './types/movie';

export const createGenresList = (films: Movies) => {
  const genres = films.map((film) => film.genre);
  const uniqueGenres = ['All genres', ...new Set(genres)];

  return uniqueGenres;
};
