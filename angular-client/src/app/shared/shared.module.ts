import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { StepperComponent } from './components/stepper/stepper.component';



@NgModule({
  declarations: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SortableModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    BsDropdownModule,
    ModalModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    StepperComponent,
    SortableModule,
    CarouselModule
  ]
})
export class SharedModule { }
