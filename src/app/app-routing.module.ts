import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { GridDisplayComponent } from './stock-display/grid-display/grid-display.component';
import { ListDisplayComponent } from './stock-display/list-display/list-display.component';
import { StockDisplayComponent } from './stock-display/stock-display.component';

const routes: Routes = [
  {
    path: 'stocks',
    component: StockDisplayComponent,
    children:[
     
      {
        path:'listDisplay',
        component:ListDisplayComponent
      },
      {
        path:'gridDisplay',
        component:GridDisplayComponent
      },
      {
        path:"**",
        component:ListDisplayComponent
      }
      
    ]
  },
  {
    path:"stocksDetails/:symbol",
    component:StockDetailsComponent
  },
  {
    path: '',
    redirectTo: '/stocks/',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
