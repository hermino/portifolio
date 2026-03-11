import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes) },
  { path: '**', redirectTo: '' }
];
