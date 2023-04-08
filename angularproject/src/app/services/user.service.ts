import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var $: any
declare var toastr: any;
declare var Toast: any;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  private baseUrl = "http://localhost:8000/api/";
  public login(form: string)
  {
    return this.http.post(this.baseUrl+"login",null).subscribe(res=>{
      var r:any =res;

      localStorage.setItem('user',JSON.stringify(r.user))
      toastr.success("Success", "Successfully Logged");
    },error =>{error.error.error.forEach((element: any)=>{toastr.error("Error", element)})});

  }
  public register(form: string)
  {
    return this.http.post(this.baseUrl+"register",null);

  }
  
}
