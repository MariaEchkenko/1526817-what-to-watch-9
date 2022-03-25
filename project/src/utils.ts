import { Movies } from './types/movie';
import { AuthorizationStatus } from './const';

export const createGenresList = (films: Movies) => {
  const genres = films.map((film) => film.genre);
  const uniqueGenres = ['All genres', ...new Set(genres)];

  return uniqueGenres;
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
