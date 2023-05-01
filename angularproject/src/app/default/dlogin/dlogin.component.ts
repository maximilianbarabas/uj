import {Router} from '@angular/router';
import {UserService} from './../../services/user.service';
import {Component} from '@angular/core';

declare var $: any
declare var toastr: any;
declare var Toast: any;

@Component({
  selector: 'app-dlogin',
  templateUrl: './dlogin.component.html',
  styleUrls: ['./dlogin.component.css']
})
export class DloginComponent {
  constructor(private userSer: UserService, private router: Router) {
  }

  login() {
    let message;
    const fd = new FormData();
    fd.append('email', $("#lemail").val());
    fd.append('password', $("#lpass").val());
    this.userSer.login("fd")
    this.router.navigateByUrl('admin/products');
  };

  hide() {
    $('#LoginModal').modal('hide');
  }
}
