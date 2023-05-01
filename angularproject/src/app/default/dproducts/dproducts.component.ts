import {ProductService} from './../../services/product.service';
import {Component, OnInit} from '@angular/core';
import {productModel} from 'src/app/models/product.model';

@Component({
  selector: 'app-dproducts',
  templateUrl: './dproducts.component.html',
  styleUrls: ['./dproducts.component.css']
})
export class DproductsComponent implements OnInit {
  products!: productModel[];

  constructor(private productService: ProductService) {
  }


  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.AllProducts.subscribe(res => {
      this.products = res
    });

    //start TODO: dummy data to be removed when linked with proper databases
    this.products = this.productService.getProducts()
    // end
  }

}
