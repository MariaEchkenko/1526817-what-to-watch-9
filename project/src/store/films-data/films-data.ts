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
      throw error;
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
      throw error;
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
      throw error;
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
  filmsStatus: LoadingStatus.IDLE,
  filmStatus: LoadingStatus.IDLE,
  promoStatus: LoadingStatus.IDLE,
  similarStatus: LoadingStatus.IDLE,
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
        state.filmsStatus = LoadingStatus.LOADING;
      })
      .addCase(fetchMoviesAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.filmsStatus = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchMoviesAction.rejected, (state) => {
        state.filmsStatus = LoadingStatus.FAILED;
      })
      .addCase(fetchMovieAction.pending, (state) => {
        state.filmStatus = LoadingStatus.LOADING;
      })
      .addCase(fetchMovieAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.filmStatus = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchMovieAction.rejected, (state) => {
        state.filmStatus = LoadingStatus.FAILED;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.promoStatus = LoadingStatus.LOADING;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.promoStatus = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.promoStatus = LoadingStatus.FAILED;
      })
      .addCase(fetchSimilarMoviesAction.pending, (state) => {
        state.similarStatus = LoadingStatus.LOADING;
      })
      .addCase(fetchSimilarMoviesAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.similarStatus = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchSimilarMoviesAction.rejected, (state) => {
        state.similarStatus = LoadingStatus.FAILED;
      });
  },
});

export const {changeGenre, incrementFilmCount, resetFilmCount} = filmsData.actions;
