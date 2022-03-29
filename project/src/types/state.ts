import { AuthorizationStatus } from '../const.js';
import { store } from '../store/index.js';
import { Movie, Movies } from './movie.js';

export type State = {
  genre: string;
  films: Movies;
  promoFilm:  Movie | null;
  renderedFilms: number;
  authorizationStatus: AuthorizationStatus;
  isDataLoaded: boolean;
};

export type AppDispatch = typeof store.dispatch;
