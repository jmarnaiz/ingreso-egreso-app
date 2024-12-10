import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as actions from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
    public loginForm: FormGroup;
    public isLoading: boolean;
    private _subscriptions: Subscription[];

    constructor(
        private _fb: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _store: Store<AppState>
    ) {
        this.loginForm = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
        this.isLoading = false;
        this._subscriptions = [];
    }

    ngOnInit(): void {
        this._subscriptions.push(
            this._store.select('ui').subscribe((ui) => {
                this.isLoading = ui.isLoading;
            })
        );
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    async login(): Promise<void> {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;

            this._store.dispatch(actions.isLoading());

            // Swal.fire({
            //     title: 'Login...',

            //     didOpen: () => {
            //         Swal.showLoading();
            //     },
            // });
            try {
                await this._authService.login(email, password);
                // Swal.close();
                this._store.dispatch(actions.stopLoading());
                this._router.navigateByUrl('dashboard');
            } catch (error: any) {
                console.error('Error login ', { error });
                this._store.dispatch(actions.stopLoading());

                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                });
            }
        }
    }
}
