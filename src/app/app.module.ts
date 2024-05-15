import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockDisplayComponent } from './stock-display/stock-display.component';
import { SearchComponent } from './stock-display/search/search.component';
import { GridDisplayComponent } from './stock-display/grid-display/grid-display.component';
import { ListDisplayComponent } from './stock-display/list-display/list-display.component';
import { StockItemComponent } from './stock-display/stock-item/stock-item.component';
import { SortDirective } from 'src/assets/directive/sort.directive';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ShowChartComponent } from './stock-details/show-chart/show-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {  MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisPipe } from 'src/assets/pipe/ellipsis.pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StockDetailsComponent,
    StockDisplayComponent,
    GridDisplayComponent,
    ListDisplayComponent,
    StockItemComponent,
    SortDirective,
    SearchComponent,
    ShowChartComponent,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    NgApexchartsModule,
    NgxPaginationModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
