import { Routes } from '@angular/router';
import { StatisticsComponent } from '../ingreso-egreso/statistics/statistics.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DetailComponent } from '../ingreso-egreso/detail/detail.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent },
    { path: 'ingreso-egreso', component: IngresoEgresoComponent },
    { path: 'detail', component: DetailComponent },
];
