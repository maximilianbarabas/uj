import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dproducts',
  templateUrl: './dproducts.component.html',
  styleUrls: ['./dproducts.component.css']
})
export class DproductsComponent implements OnInit {

  constructor(private proSer:ProductService) { }

  
  ngOnInit(): void {

    }

}
