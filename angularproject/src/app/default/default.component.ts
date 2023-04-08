import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {

  constructor(private router:Router) {
    if(localStorage.getItem('user'))
    {
      this.router.navigateByUrl('admin/products');

    }
  }

  ngOnInit(): void {

  }

}
