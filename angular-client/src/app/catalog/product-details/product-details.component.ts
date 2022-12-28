import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  product: any = {};
  constructor(private catalogService: CatalogService, private activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    
    this.getProduct();
  }
  getProduct() {
    this.catalogService.getProduct(this.id).subscribe({
      next: (prod:any) => {
        this.product= {productId:prod.productId,productName:prod.productName};
        console.log('prod', prod)
      },
      error: (err) => console.log('err', err)
    })
  }

}
