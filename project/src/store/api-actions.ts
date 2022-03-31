import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../store';
import { store } from '../store';
import {  Movie, Movies } from '../types/movie';
import { Comments } from '../types/comment';
import {
  loadMovies,
  loadMovie,
  loadPromoFilm,
  loadSimilarFilms,
  loadReviews,
  requireAuthorization,
  redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { errorHandle } from '../services/error-handle';

export const fetchMoviesAction = createAsyncThunk(
  'data/fetchMovies',
  async () => {
    try {
      const {data} = await api.get<Movies>(APIRoute.Films);
      store.dispatch(loadMovies(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchMovieAction = createAsyncThunk(
  'data/fetchMovie',
  async (id: number) => {
    try {
      const {data} = await api.get<Movie>(`${APIRoute.Films}/${id}`);
      store.dispatch(loadMovie(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSimilarMoviesAction = createAsyncThunk(
  'data/fetchSimilarMovies',
  async (id: number) => {
    try {
      const {data} = await api.get<Movies>(`${APIRoute.Films}/${id}/similar`);
      store.dispatch(loadSimilarFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk(
  'data/fetchPromoFilm',
  async () => {
    try {
      const {data} = await api.get<Movie>(APIRoute.Promo);
      store.dispatch(loadPromoFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/fetchReviews',
  async (id: number) => {
    try {
      const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Film));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

