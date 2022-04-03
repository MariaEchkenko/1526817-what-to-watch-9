import { AuthorizationStatus, LoadingStatus } from '../const.js';
import { store } from '../store/index.js';
import { Movie, Movies } from './movie.js';
import { userComment, Comments } from './comment';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
}

export type FilmsData = {
  genre: string;
  renderedFilms: number;
  films: Movies;
  film: Movie | null;
  promoFilm:  Movie | null;
  similarFilms: Movies;
  filmsStatus: LoadingStatus;
  filmStatus: LoadingStatus;
  promoStatus: LoadingStatus;
  similarStatus: LoadingStatus;
}

export type ReviewsData = {
  reviews: Comments;
  userReview: userComment | null;
  reviewsStatus: LoadingStatus;
  reviewSendedStatus: LoadingStatus;
};

export type FavoriteData = {
  favoriteFilms: Movies;
  favoriteStatus: LoadingStatus;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
