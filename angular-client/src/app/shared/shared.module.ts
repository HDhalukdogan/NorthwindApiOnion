import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    BsDropdownModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
