import { AxiosInstance } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State, FilmsData } from '../../types/state';
import { Movie, Movies } from '../../types/movie';
import { errorHandle } from '../../services/error-handle';
import { redirectToRoute } from '../action';
import { LoadingStatus, AppRoute, APIRoute, NameSpace, ALL_GENRES, FILMS_STEP } from '../../const';
import { sendFavoriteFilmAction } from '../favorite-data/favorite-data';

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
  filmsStatus: LoadingStatus.Idle,
  filmStatus: LoadingStatus.Idle,
  promoStatus: LoadingStatus.Idle,
  similarStatus: LoadingStatus.Idle,
  changeFavoriteStatus: LoadingStatus.Idle,
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
        state.filmsStatus = LoadingStatus.Loading;
      })
      .addCase(fetchMoviesAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.filmsStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchMoviesAction.rejected, (state) => {
        state.filmsStatus = LoadingStatus.Failed;
      })
      .addCase(fetchMovieAction.pending, (state) => {
        state.filmStatus = LoadingStatus.Loading;
      })
      .addCase(fetchMovieAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.filmStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchMovieAction.rejected, (state) => {
        state.filmStatus = LoadingStatus.Failed;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.promoStatus = LoadingStatus.Loading;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.promoStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.promoStatus = LoadingStatus.Failed;
      })
      .addCase(fetchSimilarMoviesAction.pending, (state) => {
        state.similarStatus = LoadingStatus.Loading;
      })
      .addCase(fetchSimilarMoviesAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.similarStatus = LoadingStatus.Succeeded;
      })
      .addCase(fetchSimilarMoviesAction.rejected, (state) => {
        state.similarStatus = LoadingStatus.Failed;
      })
      .addCase(sendFavoriteFilmAction.fulfilled, (state, {payload}) => {
        const index = state.films.findIndex(({id}) => id === payload.id);
        if (index !== -1) {
          state.films[index] = payload;
        }
        if (payload.id === state.film?.id) {
          state.film = payload;
        }
        if (payload.id === state.promoFilm?.id) {
          state.promoFilm = payload;
        }
      });
  },
});

export const {changeGenre, incrementFilmCount, resetFilmCount} = filmsData.actions;
