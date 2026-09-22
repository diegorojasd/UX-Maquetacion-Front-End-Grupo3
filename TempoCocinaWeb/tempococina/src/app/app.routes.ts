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
];
