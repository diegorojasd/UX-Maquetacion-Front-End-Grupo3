import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mockups/w-02' },
  {
    path: 'mockups',
    loadComponent: () => import('./features/mockups-index/mockups-index'),
  },
  {
    path: 'mockups/w-02',
    loadComponent: () => import('./features/recipe-list/recipe-list'),
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
    path: 'mockups/w-15',
    loadComponent: () => import('./features/manual-config/manual-config'),
  },
  {
    path: 'mockups/w-16',
    loadComponent: () => import('./features/edit-alarm/edit-alarm'),
  },
  {
    path: 'mockups/w-17',
    loadComponent: () => import('./features/suggested-sound/suggested-sound'),
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
