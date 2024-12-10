import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from './auth.actions-types';
import { UserDTO } from '../models/user.model';

export const setUser = createAction(AuthActionTypes.SET_USER, props<{ user: UserDTO }>());
export const unSetUser = createAction(AuthActionTypes.UNSET_USER);
