import { createReducer } from '@reduxjs/toolkit';
import {
  changeGenre,
  incrementFilmCount,
  loadMovies,
  loadMovie,
  loadPromoFilm,
  loadSimilarFilms,
  loadReviews,
  sendUserReview,
  requireAuthorization,
  resetFilmCount } from './action';
import { ALL_GENRES, FILMS_STEP, AuthorizationStatus } from '../const';
import { State } from '../types/state';

const initialState: State = {
  genre: ALL_GENRES,
  films: [],
  film: null,
  promoFilm: null,
  similarFilms: [],
  renderedFilms: FILMS_STEP,
  reviews: [],
  userReviews: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataMoviesLoaded: false,
  isDataMovieLoaded: false,
  isDataSimilarLoaded: false,
  isDataReviewsLoaded: false,
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
      state.isDataMoviesLoaded = true;
    })
    .addCase(loadMovie, (state, action) => {
      state.film = action.payload;
      state.isDataMovieLoaded = true;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
      state.isDataSimilarLoaded = true;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
      state.isDataReviewsLoaded = true;
    })
    .addCase(sendUserReview, (state, action) => {
      state.userReviews = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
