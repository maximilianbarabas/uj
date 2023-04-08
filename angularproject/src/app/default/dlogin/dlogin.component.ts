import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';

declare var $: any
declare var toastr: any;
declare var Toast: any;

@Component({
  selector: 'app-dlogin',
  templateUrl: './dlogin.component.html',
  styleUrls: ['./dlogin.component.css']
})
export class DloginComponent {

  constructor(private userSer:UserService) {}

  ngOnInit(): void{
    
  }
  login() {

      var message;
      const fd=new FormData();
      fd.append('email',$("#email").val());
      fd.append('password',$("#pass").val());
          this.userSer.register("fd").subscribe (
            res=>{
              message=res;
              Toast.fire({
                type:"success",
                title:"Successfully Logged"
                  });
              },
          error =>{error.error.error.forEach((element: any)=>{toastr.error("Error", element); });
          });

  }

}
