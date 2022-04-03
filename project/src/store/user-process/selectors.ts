import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';

export const selectAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
