export const ALL_GENRES = 'All genres';
export const FILMS_STEP = 8;
export const SIMILAR_FILMS_COUNT = 4;

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films',
  Player = '/player',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum NameSpace {
  User = 'USER',
  Films = 'FILMS',
  Reviews = 'REVIEWS',
  Favorite = 'FAVORITE',
}

export enum LoadingStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Succeeded = 'SUCCEEDED',
  Failed = 'FAILED',
}
