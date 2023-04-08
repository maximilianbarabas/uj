import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';

declare var $: any
declare var toastr: any;
declare var Toast: any;

@Component({
  selector: 'app-dregistration',
  templateUrl: './dregistration.component.html',
  styleUrls: ['./dregistration.component.css']
})
export class DregistrationComponent {
  constructor(private userSer:UserService) {}

  ngOnInit(): void {
    
  }
  add() {

    if($("#pass").val()!=$("#cpass").val())
    {
      toastr.error("Error","Both Password must be Same");
    }
    else 
    {
      var message;
      const fd=new FormData();
      fd.append('name',$("#name").vall());
      fd.append('email',$("#email").val());
      fd.append('password',$("#pass").val());
          this.userSer.register("fd").subscribe (
            res=>{
              message=res;
              Toast.fire({
                type:"success",
                title:"Successfully registered"
                  });
              },
          error =>{error.error.error.forEach((element: any)=>{toastr.error("Error", element); });
          });
    }

  }
}
