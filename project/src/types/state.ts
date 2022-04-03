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
  isMoviesLoaded: LoadingStatus;
  isMovieLoaded: LoadingStatus;
  isPromoLoaded: LoadingStatus;
  isSimilarLoaded: LoadingStatus;
}

export type ReviewsData = {
  reviews: Comments;
  userReview: userComment | null;
  isReviewsLoaded: LoadingStatus;
  isReviewSended: LoadingStatus;
};

export type FavoriteData = {
  favoriteFilms: Movies;
  isFavoriteLoaded: LoadingStatus;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
