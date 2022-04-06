import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectFilms = (state: State) => state[NameSpace.Films].films;
export const selectFilmsStatus = (state: State) => state[NameSpace.Films].filmStatus;
export const selectFilm = (state: State) => state[NameSpace.Films].film;
export const selectFilmStatus = (state: State) => state[NameSpace.Films].filmStatus;
export const selectPromoFilm = (state: State) => state[NameSpace.Films].promoFilm;
export const selectPromoStatus = (state: State) => state[NameSpace.Films].promoStatus;
export const selectSimilarFilms = (state: State) => state[NameSpace.Films].similarFilms;
export const selectSimilarStatus = (state: State) => state[NameSpace.Films].similarStatus;
export const selectActiveGenre = (state: State) => state[NameSpace.Films].genre;
export const selectRenderedFilms = (state: State) => state[NameSpace.Films].renderedFilms;
