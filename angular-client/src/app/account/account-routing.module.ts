import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogregGuard } from '../core/guards/logreg.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', canActivate: [LogregGuard], component: LoginComponent },
  { path: 'register', canActivate: [LogregGuard], component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
