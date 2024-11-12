import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { authGuard } from './core/guards/auth.guard';
import { userRoutes } from './pages/user/user.routes';

export const routes: Routes = [
    { path: '', component: LandingComponent }, // Ruta principal, redirige a landing

    {
        path: 'home',
        loadChildren: () => import('./pages/user/user.routes').then(a=>a.userRoutes)
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(a => a.authRoutes),
    }

];
