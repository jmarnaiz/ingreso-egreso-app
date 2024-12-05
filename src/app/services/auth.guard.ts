import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) {}

    canActivate(): Observable<boolean> {
        return this._authService.isAuthenticated().pipe(
            tap((state) => {
                // Redirect user if not authenticated
                if (!state) {
                    this._router.navigateByUrl('login');
                }
            })
        );
    }
}
