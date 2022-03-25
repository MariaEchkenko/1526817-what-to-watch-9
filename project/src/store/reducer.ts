import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenre,
  incrementFilmCount,
  loadMovies,
  requireAuthorization,
  resetFilmCount,
  setError } from './action';
import { ALL_GENRES, FILMS_STEP, AuthorizationStatus } from '../const';
import { State } from '../types/state';

const initialState: State = {
  genre: ALL_GENRES,
  films: [],
  renderedFilms: FILMS_STEP,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: '',
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(incrementFilmCount, (state) => {
      state.renderedFilms += FILMS_STEP;
    })
    .addCase(resetFilmCount, (state) => {
      state.renderedFilms = FILMS_STEP;
    })
    .addCase(loadMovies, (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
