import { ContactusComponent } from './contactus/contactus.component';
import { AboutComponent } from './about/about.component';
import { DproductsComponent } from './dproducts/dproducts.component';
import { DefaultComponent } from './default.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:DefaultComponent,
  children:[
    {path:'',component:DproductsComponent},
    {path:'products',component:DproductsComponent},
    {path:'contactus',component:ContactusComponent},
    {path:'about',component:AboutComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
