import { Injectable } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    UserCredential,
    signInWithEmailAndPassword,
    signOut,
    authState,
} from '@angular/fire/auth';
import { doc, Firestore, Unsubscribe, onSnapshot, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { UserDTO } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _userUnsubscribe!: Unsubscribe;
    constructor(
        private _auth: Auth,
        private _fireStore: Firestore,
        private _store: Store<AppState>
    ) {}

    initAuthListener() {
        authState(this._auth).subscribe((fuser) => {
            if (fuser) {
                this._userUnsubscribe = onSnapshot(
                    doc(this._fireStore, fuser.uid, 'user'),
                    (docUser) => {
                        const user = docUser.data() as UserDTO;
                        this._store.dispatch(authActions.setUser({ user }));
                    },
                    (error) => {
                        console.error('Error on init auth listener: ', error);
                    }
                );
            } else {
                if (this._userUnsubscribe) this._userUnsubscribe();
                this._store.dispatch(authActions.unSetUser());
            }
        });
    }

    createUser(name: string, email: string, password: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(this._auth, email, password);
    }

    login(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(this._auth, email, password);
    }

    logout(): Promise<void> {
        return signOut(this._auth);
    }

    isAuthenticated(): Observable<boolean> {
        return authState(this._auth).pipe(
            map((fuser) => {
                return fuser != null;
            })
        );
    }

    createDoc(user: UserDTO): Promise<void> {
        return setDoc(doc(this._fireStore, `${user.uid}/user`), user);
    }
}
