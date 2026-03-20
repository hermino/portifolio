import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { authGuard } from '@shared/guards/auth.guard';

export const adminRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/admin-login.component').then(m => m.AdminLoginComponent),
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'experiences', pathMatch: 'full' },
      { path: 'experiences', loadComponent: () => import('./experiences/admin-experiences.component').then(m => m.AdminExperiencesComponent) },
      { path: 'projects', loadComponent: () => import('./projects/admin-projects.component').then(m => m.AdminProjectsComponent) },
      { path: 'skills', loadComponent: () => import('./skills/admin-skills.component').then(m => m.AdminSkillsComponent) },
      { path: 'contacts', loadComponent: () => import('./contacts/admin-contacts.component').then(m => m.AdminContactsComponent) },
    ]
  }
];
