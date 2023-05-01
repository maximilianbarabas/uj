import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-asidebar',
  templateUrl: './asidebar.component.html',
  styleUrls: ['./asidebar.component.css']
})
export class AsidebarComponent {
  constructor(private router: Router) {
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigateByUrl('/');
  }
}
