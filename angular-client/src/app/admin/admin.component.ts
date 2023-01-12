import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { trLocale } from 'ngx-bootstrap/locale';
import { defineLocale, listLocales } from 'ngx-bootstrap/chronos';
defineLocale('tr', trLocale);

interface IItemObject {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  modalRef?: BsModalRef;
  message?: string;
  modalForm = new FormGroup({
    name: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required)
  })
  locales = listLocales()
  itemObjectsLeft: IItemObject[] = [
    { id: 1, name: 'Windstorm' },
    { id: 2, name: 'Bombasto' },
    { id: 3, name: 'Magneta' }
  ];

  itemObjectsRight: IItemObject[] = [
    { id: 4, name: 'Tornado' },
    { id: 5, name: 'Mr. O' },
    { id: 6, name: 'Tomato' }
  ];

  menus = [
    {
      name: 'Home',
      route: '/home',
      submenus: []
    },
    {
      name: 'Users',
      route: '/users',
      submenus: [
        {
          name: 'List Users',
          route: '/users/list'
        },
        {
          name: 'Add User',
          route: '/users/add'
        }
      ]
    },
    {
      name: 'Settings',
      route: '/settings',
      submenus: [
        {
          name: 'General',
          route: '/settings/general'
        },
        {
          name: 'Security',
          route: '/settings/security'
        }
      ]
    }
  ];




  constructor(private modalService: BsModalService, private bsLocalService: BsLocaleService) {
    this.bsLocalService.use('tr')
  }
  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    console.log(this.locales)
  }

  onSubmit() {
    console.log('this.modalForm.value', this.modalForm.value)
    this.message = this.modalForm.value.name
    this.modalForm.reset()
    this.modalRef?.hide();
  }

  cancel(): void {
    this.message = 'Canceled!';
    this.modalRef?.hide();
  }


}
