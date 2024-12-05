import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [],
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    constructor(
        private _fb: FormBuilder,
        private _authService: AuthService,
        private _router: Router
    ) {
        this.registerForm = this._fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {}

    public async createUser() {
        if (this.registerForm.valid) {
            Swal.fire({
                title: 'Login...',

                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const { name, email, password } = this.registerForm.value;
            try {
                const { user } = await this._authService.createUser(name, email, password);
                await this._authService.createDoc({ uid: user.uid, name, email });
                Swal.close();
                this._router.navigate(['/']);
            } catch (error: any) {
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
