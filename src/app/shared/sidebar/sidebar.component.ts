import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [],
})
export class SidebarComponent implements OnInit {
    constructor(private _authService: AuthService, private _router: Router) {}

    ngOnInit(): void {}

    async logout(): Promise<void> {
        try {
            await this._authService.logout();
            this._router.navigateByUrl('login');
        } catch (error) {
            console.error('Error while logout');
        }
    }
}
