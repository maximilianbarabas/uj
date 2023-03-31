import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
name="";
  constructor() {}

  ngOnInit(): void {
    this.name="Halhatatlan Zsoldos";
  }

}
