import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import { filmsData } from './films-data/films-data';
import { reviewsData } from './review-data/review-data';
//import { favoriteFilmsData } from './favorite-data/favorite-data';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Films]: filmsData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  //[NameSpace.Favorite]: favoriteFilmsData.reducer,
});
