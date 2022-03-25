import { createAction } from '@reduxjs/toolkit';
import { Movies } from '../types/movie';
import { AuthorizationStatus } from '../const';

export const changeGenre = createAction<string>('films/changeGenre');
export const incrementFilmCount = createAction('films/incrementFilmCount');
export const resetFilmCount = createAction('films/resetFilmCount');
export const loadMovies = createAction<Movies>('data/loadMovies');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string>('game/setError');
