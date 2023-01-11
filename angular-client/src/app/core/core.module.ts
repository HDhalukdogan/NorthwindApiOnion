import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HasRoleDirective } from './directives/has-role.directive';
import { SideBarComponent } from './side-bar/side-bar.component';



@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent,
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NavBarComponent,
    SideBarComponent
  ]
})
export class CoreModule { }
