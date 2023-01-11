import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StepperComponent } from './components/stepper/stepper.component';



@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    BsDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    StepperComponent
  ]
})
export class SharedModule { }
