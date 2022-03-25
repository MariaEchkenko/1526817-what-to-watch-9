import { AuthorizationStatus } from '../const.js';
import { store } from '../store/index.js';
import { Movies } from './movie.js';

export type State = {
  genre: string;
  films: Movies;
  renderedFilms: number;
  authorizationStatus: AuthorizationStatus;
  error: string;
  isDataLoaded: boolean;
};

export type AppDispatch = typeof store.dispatch;
