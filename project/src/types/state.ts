import { store } from '../store/index.js';
import { Movie } from './movie.js';

export type State = {
  genre: string;
  allFilms: Movie;
};

export type AppDispatch = typeof store.dispatch;
