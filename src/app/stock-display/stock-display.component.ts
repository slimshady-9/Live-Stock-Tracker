import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-display',
  templateUrl: './stock-display.component.html',
  styleUrls: ['./stock-display.component.css']
})
export class StockDisplayComponent implements OnInit {
  public active= "";
  public noOfItemsOption :number[]= [5,10,15,20];
  public noOfItemsPerPage :number;
  constructor(private router: Router) { 
    this.active = "list";
    this.noOfItemsPerPage = 5;
  }

  ngOnInit(): void {
  }
  listView(){
    this.active = "list";
    this.router.navigate(['stocks','listDisplay'])

  }
  gridView(){
    this.active = 'grid';
    this.router.navigate(['stocks','gridDisplay'])
  }
  isActive(active : string){
    if(this.active === active){
      return "active"
    }
    return "";
  }
}
