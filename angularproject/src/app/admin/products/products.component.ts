import {productModel} from '../../models/product.model';
import {ProductService} from 'src/app/services/product.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

declare var $: any
declare var toastr: any;
declare var Toast: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productForm!: UntypedFormGroup

  products!: productModel[];
  SelectedImage: File = null as any;
  tempID = "";
  isEdit = false
  isDisable = false

  categories = this.productService.categories

  brands = this.productService.brands

  constructor(private productService: ProductService, private _formBuilder: FormBuilder) {
    this.productForm = this._formBuilder.group({
      name: [{value: null, disabled: false}, Validators.required],
      category: [{value: null, disabled: false}, Validators.required],
      description: [{value: null, disabled: false}, Validators.required],
      brand: [{value: null, disabled: false}, Validators.required],
      price: [{value: null, disabled: false}, Validators.required],
    });
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

  search(input: any) {

    if (input === '') {
      this.getAllProducts()
      return
    }

    const searchText = input.toLowerCase()
    this.products = this.products.filter(product => {
      const productName = product.name.toLowerCase()
      return productName.includes(searchText)
    });

    this.productService.getFromDb(input);
  }

  addProduct() {
    const isValid = this.productForm.valid
    if (!isValid) {
      this.productService.gettingErrorsForm(this.productForm)
      return
    }

    const formValue = this.productForm.getRawValue()
    formValue.image = this.SelectedImage || './assets/1.png'

    if (!this.isEdit) {
      this.productService.add(formValue).subscribe((response) => {
        if (response) {
          Toast.fire({
            type: "success",
            title: response
          });
          this.productService.getFromDb("");
          this.productForm.reset()
          this.hideProductModal('#AddModal')
        }
      }, error => {
        toastr.error("Error", error.message)
        this.hideProductModal('#AddModal')
      })


      //start TODO: dummy data to be removed when linked with proper databses
      this.productService.sampleProducts.push(formValue)
      this.hideProductModal('#AddModal')
      // end TODO

    } else {
      formValue.id = this.tempID
      this.productService.update(formValue).subscribe((response) => {
        if (response) {
          Toast.fire({
            type: "success",
            title: response
          });
          this.productService.getFromDb("");
          this.isEdit = false
          this.productForm.reset()
          this.hideProductModal('#AddModal')
        }
      }, error => {
        this.isEdit = true
        toastr.error("Error", error.message)
        this.hideProductModal('#AddModal')
      })

      //start TODO: dummy data to be removed when linked with proper databases
      this.products = this.products.map(product => product.id !== this.tempID ? product : formValue)
      this.hideProductModal('#AddModal')
      // end TODO
    }
  }

  showProduct(product: productModel) {
    this.productForm.patchValue(product)
    this.openProductModal('#AddModal', 'disable')
  }

  updateProduct(product: productModel) {
    this.tempID = product.id
    this.productForm.patchValue(product)
    this.openProductModal('#AddModal', 'edit')
  }

  deleteProduct(id: any) {
    this.tempID = id;
  }

  confirmDelete() {
    this.productService.delete(this.tempID).subscribe(
      res => {
        Toast.fire({
          type: "success",
          title: res
        });
        this.hideProductModal('#DeleteModal')
        this.productService.getFromDb("");
      },
      error => {
        toastr.error("Error", error.message);
      });


    //start TODO: dummy data to be removed when linked with proper databases
    const subjectTemp = this.products.findIndex((product) => product.id === this.tempID)
    this.products.splice(subjectTemp, 1)
    this.hideProductModal('#DeleteModal')
    // end
  }

  openProductModal(value: string, mode: string) {
    if (mode === 'add') {
      this.isEdit = this.isDisable = false
      this.productForm.reset()
      this.productForm.enable()
    }
    if (mode === 'edit') {
      this.productForm.enable()
      this.isEdit = true
      this.isDisable = false
    }
    if (mode === 'disable') {
      this.productForm.disable()
      this.isDisable = true
    }

    $(value).modal('show');
  }

  hideProductModal(value: string) {
    this.tempID = ''
    this.isEdit = this.isDisable = false
    this.productForm.reset()

    $(value).modal('hide');
  }

  onSelect(event: any) {
    let tempPath = URL.createObjectURL(event.target.files[0]);
    $("#AddEmpImage").fadeIn("fast").attr('src', tempPath);
    this.SelectedImage = <File>event.target.files[0];
  }
}
