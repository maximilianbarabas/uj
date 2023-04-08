import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements  OnInit {
name="";
  constructor() {}

  ngOnInit(): void {
    var user:any=JSON.parse(localStorage.getItem('user') || '{}');
    this.name=user.name;
  }

}
