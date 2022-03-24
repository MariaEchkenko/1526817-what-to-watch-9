import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, incrementFilmCount, resetFilmCount } from './action';
import { films } from '../mocks/films';
import { ALL_GENRES, FILMS_STEP } from '../const';

const initialState = {
  genre: ALL_GENRES,
  allFilms: films,
  stepFilms: FILMS_STEP,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(incrementFilmCount, (state) => {
      state.stepFilms += FILMS_STEP;
    })
    .addCase(resetFilmCount, (state) => {
      state.stepFilms = FILMS_STEP;
    });
});

export {reducer};
