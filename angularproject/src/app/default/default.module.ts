import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { DproductsComponent } from './dproducts/dproducts.component';
import { DleftsidebarComponent } from './dleftsidebar/dleftsidebar.component';
import { DrightsidebarComponent } from './drightsidebar/drightsidebar.component';
import { DregistrationComponent } from './dregistration/dregistration.component';
import { DloginComponent } from './dlogin/dlogin.component';
import { DtopbarComponent } from './dtopbar/dtopbar.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DproductsComponent,
    DleftsidebarComponent,
    DrightsidebarComponent,
    DregistrationComponent,
    DloginComponent,
    DtopbarComponent,
    AboutComponent,
    ContactusComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule
  ]
})
export class DefaultModule { }
