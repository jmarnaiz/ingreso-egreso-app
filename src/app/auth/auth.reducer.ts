import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser } from './auth.actions';
import { UserDTO } from '../models/user.model';

export interface State {
    user: UserDTO;
}

const EMPTY_USER: UserDTO = { uid: '0', name: '', email: '' };

export const initialState: State = {
    user: EMPTY_USER,
};

export const authReducer = createReducer(
    initialState,
    on(setUser, (state, { user }) => ({ ...state, user })),
    on(unSetUser, (state) => ({ ...state, user: EMPTY_USER }))
);
