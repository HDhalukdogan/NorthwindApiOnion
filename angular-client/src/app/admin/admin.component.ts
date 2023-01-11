import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  modalRef?: BsModalRef;
  message?: string;
  modalForm = new FormGroup({
    name: new FormControl("", Validators.required)
  })
  constructor(private modalService: BsModalService) { }
  ngOnInit(): void {

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  onSubmit() {
    this.message = this.modalForm.value.name
    this.modalRef?.hide();
  }

  cancel(): void {
    this.message = 'Canceled!';
    this.modalRef?.hide();
  }


}
