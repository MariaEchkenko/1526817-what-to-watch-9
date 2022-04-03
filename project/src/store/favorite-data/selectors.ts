import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const selectFavoriteFilms = (state: State) => state[NameSpace.Favorite].favoriteFilms;
export const selectIsFavoriteLoaded = (state: State) => state[NameSpace.Favorite].isFavoriteLoaded;
