import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    constructor(
        private _fb: FormBuilder,
        private _authService: AuthService,
        private _router: Router
    ) {
        this.loginForm = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {}

    async login(): Promise<void> {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;

            Swal.fire({
                title: 'Login...',

                didOpen: () => {
                    Swal.showLoading();
                },
            });
            try {
                await this._authService.login(email, password);
                Swal.close();
                this._router.navigateByUrl('dashboard');
            } catch (error: any) {
                console.error('Error login ', { error });
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                });
            }
        }
    }
}
