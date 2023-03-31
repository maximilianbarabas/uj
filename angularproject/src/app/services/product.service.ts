import { Injectable } from '@angular/core';
import { productModel } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

AllProducts=new BehaviorSubject<productModel[]>(null!);
  constructor(private http:HttpClient)
  {
    this.getFromDb("");

  }
  private baseUrl = "http://localhost:8000/api/";

  public add(form: any)
  {
    return this.http.post(this.baseUrl+"add",form);

  }
  public delete(id: string)
  {
    return this.http.post(this.baseUrl+"delete?id="+id,null);

  }
  public update(form: any)
  {
    return this.http.post(this.baseUrl+"update",form);

  }
  public getFromDb(keys: string)
  {
    return this.http.post(this.baseUrl+"show?keys="+keys,null).subscribe(res=>{
      var r:any =res;
    this.AllProducts.next(r.products)
    })

  }
}
