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
tempID="";


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
  selectForUpdate(id: any)
  {
    this.tempID=(id)
    this.products.forEach(el=> {
      if(id==el.id)
      {
        $("#uname").prop("value",el.name)
        $("#oldcategory").prop("value",el.category)
        $("#oldcategory").html(el.category)
        $("#oldbrand").prop("value",el.brand)
        $("#oldbrand").html("value",el.brand)
        $("#price").prop("value",el.price)
        $("#description").prop("value",el.description)
        $("#UpdateImage").fadeIn("fast").attr('src',el.imgpath);
      }
    })
    }

    selectForShow(id:any)
    {
      this.tempID=(id)
      this.products.forEach(el=> {
        if(id==el.id)
        {
          $("#sname").prop("value",el.name)
          $("#sodcategory").html(el.category)
          $("#soldcategory").prop("value",el.category)
          $("#soldbrand").html("value",el.brand)
          $("#soldbrand").prop("value",el.brand)
          $("#sprice").prop("value",el.price)
          $("#sdescription").prop("value",el.description)
          $("#ShowImage").fadeIn("fast").attr('src',el.imgpath);

        }
      })
  
  
  }
  update()
  {
    var message;
    const fd=new FormData();
    fd.append('id',this.tempID);
    fd.append('name',$("#uname").vall());
    fd.append('category',$("#ucategory").val());
    fd.append('brand',$("#ubrand").val());
    fd.append('price',$("#uprice").val());
    fd.append('description',$("#udescription").val());
        this.proser.update(fd).subscribe (
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
  SelectForDelete(id: any)
  {
    this.tempID=id;
  }
  deleteConform()
  {
    var message;
    this.proser.delete(this.tempID).subscribe (
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
function selectForShow(id: any, any: any) {
  throw new Error('Function not implemented.');
}

