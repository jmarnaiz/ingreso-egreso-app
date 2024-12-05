import { Injectable } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    UserCredential,
    signInWithEmailAndPassword,
    signOut,
    authState,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { UserDTO } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private _auth: Auth, private _fireStore: Firestore) {}

    initAuthListener() {
        authState(this._auth).subscribe((fuser) => {
            console.log('Firebase user: ', fuser);
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
