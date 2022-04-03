import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectFilms = (state: State) => state[NameSpace.Films].films;
export const selectIsMoviesLoaded = (state: State) => state[NameSpace.Films].isMovieLoaded;
export const selectFilm = (state: State) => state[NameSpace.Films].film;
export const selectIsMovieLoaded = (state: State) => state[NameSpace.Films].isMovieLoaded;
export const selectPromoFilm = (state: State) => state[NameSpace.Films].promoFilm;
export const selectIsPromoLoaded = (state: State) => state[NameSpace.Films].isPromoLoaded;
export const selectSimilarFilms = (state: State) => state[NameSpace.Films].similarFilms;
export const selectIsSimilarLoaded = (state: State) => state[NameSpace.Films].isSimilarLoaded;
export const selectActiveGenre = (state: State) => state[NameSpace.Films].genre;
export const selectRenderedFilms = (state: State) => state[NameSpace.Films].renderedFilms;
