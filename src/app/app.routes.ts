import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeRoutes } from './components/home/index';
import { LoginComponent } from './components/login/index';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { name: 'Login' } },
  ...HomeRoutes,

  { path: '**', redirectTo: '' }
];

export const AppRoutes = RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: PreloadAllModules });