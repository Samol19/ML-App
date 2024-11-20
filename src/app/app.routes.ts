import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { TopCategoriesComponent } from './pages/list/list.component';
import { LandingComponentLight } from './pages/landingl/landing.component';

export const routes: Routes = [
    { path: '', component: LandingComponentLight }, // Ruta principal, redirige a landing
    { path: 'sarimax', component: LandingComponent }, // Ruta principal, redirige a landing
    { path: 'list', component: TopCategoriesComponent }, // Ruta principal, redirige a landing



];
