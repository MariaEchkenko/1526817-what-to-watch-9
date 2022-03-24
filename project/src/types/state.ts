import { store } from '../store/index.js';
import { Movies } from './movie.js';

export type State = {
  genre: string;
  allFilms: Movies;
  stepFilms: number;
};

export type AppDispatch = typeof store.dispatch;
