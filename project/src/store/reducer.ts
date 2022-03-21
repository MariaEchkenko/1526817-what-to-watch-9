import { createReducer } from '@reduxjs/toolkit';
import { changeGenre } from './action';
import { films } from '../mocks/films';
import { ALL_GENRES } from '../const';

const initialState = {
  genre: ALL_GENRES,
  allFilms: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    });
});

export {reducer};
