import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from '@shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./admin/login/admin-login.component').then((m) => m.AdminLoginComponent),
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'experiences', pathMatch: 'full' },
      {
        path: 'experiences',
        loadComponent: () =>
          import('./admin/experiences/admin-experiences.component').then(
            (m) => m.AdminExperiencesComponent
          ),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./admin/projects/admin-projects.component').then(
            (m) => m.AdminProjectsComponent
          ),
      },
      {
        path: 'skills',
        loadComponent: () =>
          import('./admin/skills/admin-skills.component').then((m) => m.AdminSkillsComponent),
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('./admin/contacts/admin-contacts.component').then(
            (m) => m.AdminContactsComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
