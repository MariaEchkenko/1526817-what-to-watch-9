import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../index';
import { FavoriteData } from '../../types/state';
import { Movies } from '../../types/movie';
import { errorHandle } from '../../services/error-handle';
import { LoadingStatus, APIRoute, NameSpace } from '../../const';

export const fetchFavoriteFilmsAction = createAsyncThunk(
  'data/fetchFavoriteFilms',
  async () => {
    try {
      const {data} = await api.get<Movies>(APIRoute.Favorite);
      return data;
    } catch (error) {
      errorHandle(error);
      throw error;
    }
  },
);

const initialState: FavoriteData = {
  favoriteFilms: [],
  isFavoriteLoaded: LoadingStatus.IDLE,
};

export const favoriteFilmsData = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.isFavoriteLoaded = LoadingStatus.LOADING;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.isFavoriteLoaded = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchFavoriteFilmsAction.rejected, (state) => {
        state.isFavoriteLoaded = LoadingStatus.FAILED;
      });
  },
});
