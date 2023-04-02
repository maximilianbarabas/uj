import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { productModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-dproducts',
  templateUrl: './dproducts.component.html',
  styleUrls: ['./dproducts.component.css']
})
export class DproductsComponent implements OnInit {
  products!: productModel[]; 

  constructor(private proSer:ProductService) { }

  
  ngOnInit(): void {
    this.proSer.AllProducts.subscribe(res=>{
  
      this.products=res
    console.log(this.products);
    
    });

    }

}
