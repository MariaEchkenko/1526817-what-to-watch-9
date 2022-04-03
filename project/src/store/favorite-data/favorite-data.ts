import { AxiosInstance } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State, FavoriteData } from '../../types/state';
import { Movies } from '../../types/movie';
import { errorHandle } from '../../services/error-handle';
import { LoadingStatus, APIRoute, NameSpace } from '../../const';

export const fetchFavoriteFilmsAction = createAsyncThunk<Movies, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoriteFilms',
  async (_arg, {dispatch, extra: api}) => {
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
