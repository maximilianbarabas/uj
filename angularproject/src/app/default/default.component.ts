import {Router} from '@angular/router';
import {Component} from '@angular/core';

declare var $: any

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {
  loginState = 'login'

  constructor(private router: Router) {
    if (localStorage.getItem('user')) {
      this.router.navigateByUrl('admin/products');
    }
  }

  hide() {
    $('#LoginModal').modal('hide');
  }

}
