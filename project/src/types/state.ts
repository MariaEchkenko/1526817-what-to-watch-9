import { AuthorizationStatus } from '../const.js';
import { store } from '../store/index.js';
import { Movie, Movies } from './movie.js';
import { userComment, Comments } from './comment';

export type State = {
  genre: string;
  films: Movies;
  film: Movie | null;
  promoFilm:  Movie | null;
  similarFilms: Movies;
  reviews: Comments;
  userReviews: userComment | null;
  renderedFilms: number;
  authorizationStatus: AuthorizationStatus;
  isDataMoviesLoaded: boolean;
  isDataMovieLoaded: boolean;
  isDataSimilarLoaded: boolean;
  isDataReviewsLoaded: boolean;
};

export type AppDispatch = typeof store.dispatch;
