import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'', loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)},
  {path:'admin',loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)},
  {path:'account',canActivate:[AdminGuard],loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)},
  {path:'catalog',canActivate:[AuthGuard], loadChildren: () => import('./catalog/catalog.module').then(mod => mod.CatalogModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
