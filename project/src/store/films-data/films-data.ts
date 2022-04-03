import { AxiosInstance } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State, FilmsData } from '../../types/state';
import { Movie, Movies } from '../../types/movie';
import { errorHandle } from '../../services/error-handle';
import { redirectToRoute } from '../action';
import { LoadingStatus, AppRoute, APIRoute, NameSpace, ALL_GENRES, FILMS_STEP } from '../../const';

export const fetchMoviesAction = createAsyncThunk<Movies, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchMovies',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Movies>(APIRoute.Films);
      return data;
    } catch (error) {
      errorHandle(error);
      throw error;
    }
  },
);

export const fetchMovieAction = createAsyncThunk<Movie, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchMovie',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Movie>(`${APIRoute.Films}/${id}`);
      return data;
    } catch (error) {
      dispatch(redirectToRoute(AppRoute.NotFound));
      errorHandle(error);
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk<Movie, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Movie>(APIRoute.Promo);
      return data;
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSimilarMoviesAction = createAsyncThunk<Movies, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarMovies',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Movies>(`${APIRoute.Films}/${id}/similar`);
      return data;
    } catch (error) {
      errorHandle(error);
    }
  },
);

const initialState: FilmsData = {
  genre: ALL_GENRES,
  renderedFilms: FILMS_STEP,
  films: [],
  film: null,
  promoFilm: null,
  similarFilms: [],
  isMoviesLoaded: LoadingStatus.IDLE,
  isMovieLoaded: LoadingStatus.IDLE,
  isPromoLoaded: LoadingStatus.IDLE,
  isSimilarLoaded: LoadingStatus.IDLE,
};

export const filmsData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    changeGenre: (state, action) => {
      state.genre = action.payload;
    },
    incrementFilmCount: (state) => {
      state.renderedFilms += FILMS_STEP;
    },
    resetFilmCount: (state) => {
      state.renderedFilms = FILMS_STEP;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMoviesAction.pending, (state) => {
        state.isMoviesLoaded = LoadingStatus.LOADING;
      })
      .addCase(fetchMoviesAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isMoviesLoaded = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchMoviesAction.rejected, (state) => {
        state.isMoviesLoaded = LoadingStatus.FAILED;
      })
      .addCase(fetchMovieAction.pending, (state) => {
        state.isMovieLoaded = LoadingStatus.LOADING;
      })
      .addCase(fetchMovieAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isMovieLoaded = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchMovieAction.rejected, (state) => {
        state.isMovieLoaded = LoadingStatus.FAILED;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isPromoLoaded = LoadingStatus.LOADING;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isPromoLoaded = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.isPromoLoaded = LoadingStatus.FAILED;
      })
      .addCase(fetchSimilarMoviesAction.pending, (state) => {
        state.isSimilarLoaded = LoadingStatus.LOADING;
      })
      .addCase(fetchSimilarMoviesAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isSimilarLoaded = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchSimilarMoviesAction.rejected, (state) => {
        state.isSimilarLoaded = LoadingStatus.FAILED;
      });
  },
});

export const {changeGenre, incrementFilmCount, resetFilmCount} = filmsData.actions;
