import { productModel } from './../../models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';

declare var $: any
declare var toastr: any;
declare var Toast: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products!: productModel[]; 
// For Image 
SelectedImage:File=null as any;

  constructor(private proser:ProductService) {

  }

  ngOnInit(): void {
this.proser.AllProducts.subscribe(res=>{
  
  this.products=res
console.log(this.products);

});

  }

  search(input: any)
  {
    this.proser.getFromDb(input);
  }

  onSelect(event: any)
  {
    var tmppath = URL.createObjectURL(event.target.files[0]);
    $("#AddEmpImage").fadeIn("fast").attr('src',tmppath);
    this.SelectedImage=<File>event.target.files[0];
  }

add() {
  var message;
const fd=new FormData();
fd.append('image',this.SelectedImage);
fd.append('name',$("#name").vall());
fd.append('category',$("#category").val());
fd.append('brand',$("#brand").val());
fd.append('price',$("#price").val());
fd.append('description',$("#description").val());
    this.proser.add(fd).subscribe (
      res=>{
        message=res;
        Toast.fire({
          type:"success",
          title:message});
          this.proser.getFromDb("");
        },
    error =>{error.error.error.forEach((element: any)=>{toastr.error("Error", element); });
    });
}
}

