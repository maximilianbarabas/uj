import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    constructor(private router:Router) {
    if(localStorage.getItem('user'))
    {
      this.router.navigateByUrl('/');

    }
  }

  ngOnInit(): void {

  }

}
