import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'account',loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)},
  {path:'catalog',canActivate:[AuthGuard], loadChildren: () => import('./catalog/catalog.module').then(mod => mod.CatalogModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
