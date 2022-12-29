import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HasRoleDirective } from './directives/has-role.directive';



@NgModule({
  declarations: [
    NavBarComponent,
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    NavBarComponent
  ]
})
export class CoreModule { }
