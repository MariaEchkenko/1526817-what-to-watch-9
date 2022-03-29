import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenre,
  incrementFilmCount,
  loadMovies,
  loadPromoFilm,
  requireAuthorization,
  resetFilmCount } from './action';
import { ALL_GENRES, FILMS_STEP, AuthorizationStatus } from '../const';
import { State } from '../types/state';

const initialState: State = {
  genre: ALL_GENRES,
  films: [],
  promoFilm: null,
  renderedFilms: FILMS_STEP,
  authorizationStatus: AuthorizationStatus.Unknown,
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
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
