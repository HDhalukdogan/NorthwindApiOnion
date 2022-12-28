import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CatalogService } from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {
  data: any = []
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.getProducts();
    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };
  }

  getProducts() {
    this.catalogService.getProducts().subscribe({
      next: (products) => {
        this.dtTrigger.next(null);
        this.data = products;
      },
      error: (err) => console.log('err', err)
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
