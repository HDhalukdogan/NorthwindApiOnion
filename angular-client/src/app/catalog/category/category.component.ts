import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any = [];
  selectedOption;
  selectedCategory="";
  constructor(private catalogService: CatalogService) { }


  ngOnInit(): void {
    this.getCategories();
  }


  getCategory() {
    console.log('this.selectedOption', typeof this.selectedOption)
    this.selectedCategory = this.categories.find(s => s.categoryId == this.selectedOption)
    console.log('selectedCategory', this.selectedCategory)
  }

  getProducts(id){
    this.selectedCategory = this.categories.find(s => s.categoryId == id)
    console.log('id', id)
  }


  getCategories() {
    this.catalogService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res
        console.log('this.categories', this.categories)
      },
      error: (err) => console.log('err', err)
    })
  }

}
