import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as actions from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [],
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    public isLoading: boolean;
    private _subscriptions: Subscription[];
    constructor(
        private _fb: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _store: Store<AppState>
    ) {
        this.registerForm = this._fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
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

    public async createUser() {
        if (this.registerForm.valid) {
            this._store.dispatch(actions.isLoading());
            // Swal.fire({
            //     title: 'Login...',

            //     didOpen: () => {
            //         Swal.showLoading();
            //     },
            // });

            const { name, email, password } = this.registerForm.value;
            try {
                const { user } = await this._authService.createUser(name, email, password);
                await this._authService.createDoc({ uid: user.uid, name, email });
                // Swal.close();
                this._store.dispatch(actions.stopLoading());
                this._router.navigate(['/']);
            } catch (error: any) {
                this._store.dispatch(actions.stopLoading());

                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                });
            }
        }
    }

    // convenience getters for easy access to form fields
    public get controls() {
        return this.registerForm.controls;
    }
}
