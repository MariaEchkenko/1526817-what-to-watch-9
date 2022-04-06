import { AxiosInstance } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State, FavoriteData } from '../../types/state';
import { Movie, Movies } from '../../types/movie';
import { FilmStatus } from '../../types/film-status';
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

export const sendFavoriteFilmAction = createAsyncThunk<Movie, FilmStatus, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/sendFavoriteFilm',
  async ({id, status}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post(`${APIRoute.Favorite}/${id}/${status}`);
      return data;
    } catch (error) {
      errorHandle(error);
      throw error;
    }
  },
);

const initialState: FavoriteData = {
  favoriteFilms: [],
  favoriteStatus: LoadingStatus.Idle,
  changeFavoriteStatus: LoadingStatus.Idle,
};

export const favoriteFilmsData = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.favoriteStatus = LoadingStatus.Loading;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchFavoriteFilmsAction.rejected, (state) => {
        state.favoriteStatus = LoadingStatus.Failed;
      })
      .addCase(sendFavoriteFilmAction.pending, (state) => {
        state.changeFavoriteStatus = LoadingStatus.Loading;
      })
      .addCase(sendFavoriteFilmAction.fulfilled, (state) => {
        state.changeFavoriteStatus = LoadingStatus.Succeeded;
      })
      .addCase(sendFavoriteFilmAction.rejected, (state) => {
        state.changeFavoriteStatus = LoadingStatus.Failed;
      });
  },
});
