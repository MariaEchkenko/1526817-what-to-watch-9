import { AuthorizationStatus } from '../const.js';
import { store } from '../store/index.js';
import { Movie, Movies } from './movie.js';

export type State = {
  genre: string;
  films: Movies;
  film: Movie | null;
  promoFilm:  Movie | null;
  similarFilms: Movies;
  renderedFilms: number;
  authorizationStatus: AuthorizationStatus;
  isDataMoviesLoaded: boolean;
  isDataMovieLoaded: boolean;
  isDataSimilarLoaded: boolean;
};

export type AppDispatch = typeof store.dispatch;
