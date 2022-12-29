import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any = [];
  selectedCategory: any = {};
  form: FormGroup;
  editToggle = true


  constructor(private catalogService: CatalogService, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getProducts(id) {
    this.selectedCategory = this.categories.find(s => s.categoryId == id)
    console.log('selectedCategory', this.selectedCategory)
  }

  getCategories() {
    this.catalogService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res
        this.getProducts(1)
        console.log('this.categories', this.categories)
      },
      error: (err) => console.log('err', err)
    })
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      // let i: number = 0;
      // checkArray.controls.forEach((item: FormControl) => {
      //   if (item.value == e.target.value) {
      //     checkArray.removeAt(i);
      //     return;
      //   }
      //   i++;
      // });
      let index = checkArray.controls.findIndex(s => s.value == e.target.value);
      checkArray.removeAt(index)
    }
  }

  onSelectAllChange(e) {
    console.log('e', e)
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e) {
      this.selectedCategory.products.forEach((product: any) => checkArray.push(new FormControl(product.productId)))
    } else {
      // let i: number = 0;
      // checkArray.controls.forEach((item: FormControl) => {
      //     checkArray.removeAt(i);
      //   i++;
      // });
      checkArray.clear()
    }
  }

  onSubmit() {
    console.log('this.form.value', this.form.value)
    this.form.reset();
    this.onSelectAllChange(false)
  }

  edit(){
    this.editToggle = !this.editToggle
  }
}
