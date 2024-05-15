import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { StockDisplayComponent } from './stock-display.component';

@NgModule({
    imports:[BrowserModule,FormsModule, BrowserAnimationsModule],
    declarations:[],
    bootstrap:[StockDisplayComponent]
})
export class StockModule{};