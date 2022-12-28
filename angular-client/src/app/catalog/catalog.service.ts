import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  baseUrl = 'http://localhost:5011/api/';
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.baseUrl + "products");
  }

  getProduct(id) {
    return this.http.get(this.baseUrl + "products/" + id);
  }
  getCategories() {
    return this.http.get(this.baseUrl + "categories");
  }

}
