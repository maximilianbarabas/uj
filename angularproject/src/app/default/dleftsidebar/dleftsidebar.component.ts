import {Component} from '@angular/core';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-dleftsidebar',
  templateUrl: './dleftsidebar.component.html',
  styleUrls: ['./dleftsidebar.component.css']
})
export class DleftsidebarComponent {
  brands = this.productService.brands
  categories = this.productService.categories

  constructor(private productService: ProductService) {

  }
}
