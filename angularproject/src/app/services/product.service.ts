import {Injectable} from '@angular/core';
import {productModel} from '../models/product.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  sampleProducts: any = [{
    "name": "Nike Air Max 270",
    "imgpath": "./assets/1.png",
    "category": "Shoes",
    "brand": "Nike",
    "price": 149.99,
    "description": "The Nike Air Max 270 delivers modern comfort and style with a huge Max Air unit and sock-like fit.",
    "id": "NAM270001"
  }, {
    "name": "Apple iPhone 12 Pro",
    "imgpath": "./assets/1.png",
    "category": "Ball",
    "brand": "Adidas",
    "price": 999.99,
    "description": "The iPhone 12 Pro features a 6.1-inch Super Retina XDR display, 5G connectivity, A14 Bionic chip, and a pro camera system.",
    "id": "AIP12P001"
  }, {
    "name": "Samsung 55-inch QLED TV",
    "imgpath": "./assets/1.png",
    "category": "Shirts",
    "brand": "Puma",
    "price": 1299.99,
    "description": "Experience vivid, realistic colors and detail with the Samsung 55-inch QLED TV, featuring Quantum Dot technology and 4K resolution.",
    "id": "SQLED55"
  }, {
    "name": "Lululemon Align Pants",
    "imgpath": "/./assets/1.png",
    "category": "Shirts",
    "brand": "Puma",
    "price": 98.00,
    "description": "The Lululemon Align Pants are made with their signature buttery-soft Nulu fabric for ultimate comfort during yoga or any low-impact activity.",
    "id": "LLMNALN001"
  }]


  categories = [
    {value: 'Shirts', key: 'Mezek'},
    {value: 'Shoes', key: 'Cipők'},
    {value: 'Ball', key: 'Labda'}
  ]

  brands = [
    {value: 'Nike', key: 'Nike', count: 2},
    {value: 'Adidas', key: 'Adidas', count: 1},
    {value: 'Puma', key: 'Puma', count: 1}
  ]

  AllProducts = new BehaviorSubject<productModel[]>(null!);
  private baseUrl = "http://localhost:8000/api/";

  constructor(private http: HttpClient) {
    this.getFromDb("");
  }

  getProducts() {
    return this.sampleProducts
  }

  public add(form: any) {
    return this.http.post(this.baseUrl + "add", form);
  }

  public delete(id: string) {
    return this.http.post(this.baseUrl + "delete?id=" + id, null);
  }

  public update(form: any) {
    return this.http.post(this.baseUrl + "update", form);
  }

  public getFromDb(keys: string) {
    return this.http.get(this.baseUrl + "show?keys=" + keys).subscribe(res => {
      let r: any = res;
      if (r) this.AllProducts.next(r.products)
    })
  }

  gettingErrorsForm(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({onlySelf: true});
      }
    });
    return form
  }
}
