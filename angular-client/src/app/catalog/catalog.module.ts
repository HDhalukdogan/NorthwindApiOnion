import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    CatalogComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule,
    DataTablesModule
  ]
})
export class CatalogModule { }
