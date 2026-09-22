import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mockups' },
  {
    path: 'mockups',
    loadComponent: () => import('./features/mockups-index/mockups-index'),
  },
  {
    path: 'mockups/w-06',
    loadComponent: () => import('./features/recipe-detail/recipe-detail'),
  },
  {
    path: 'mockups/w-13',
    loadComponent: () => import('./features/auto-config/auto-config'),
  },
  {
    path: 'mockups/w-22',
    loadComponent: () => import('./features/confirm-transfer/confirm-transfer'),
  },
  {
    path: 'mockups/w-24',
    loadComponent: () => import('./features/synced-alarms/synced-alarms'),
  },
];
