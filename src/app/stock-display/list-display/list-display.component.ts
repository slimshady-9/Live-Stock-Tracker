import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataFetchService } from 'src/assets/services/data-fetch.service';
import { Stock } from 'src/assets/models/stock.model';
import { dataLocal } from 'src/assets/models/data';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css'],
})
export class ListDisplayComponent implements OnInit, OnDestroy, AfterViewInit {
  private subcription: Subscription | undefined;
  private searchSub: Subscription | undefined;
  private loadSub: Subscription;
  public stocks: Stock[] = [];
  public upArrow = '▲';
  public downArrow = '▼';
  public active = "";
  public itemsPerPage: number;
  public currentPage: number;
  public totalItems: number;
  public loadingSubject: Subject<boolean>;
  public loading: boolean = true;
  public tooltip: number = 15;
  public dynamicStock : Array<string> = [];
  public dynamicStockSub : Subscription[] = [];
  public itemPerPageOptions : Array<number> = [5,10,15,20];

  constructor(private dataService: DataFetchService, private router: Router) {
    this.itemsPerPage = this.itemPerPageOptions[0];
    this.currentPage = 1;
    this.totalItems = 0;
    this.loadingSubject = new Subject<boolean>();
    this.loadSub = this.loadingSubject.subscribe(data => {
      this.loading = data;

    })
    this.loadingSubject.next(true);
  }


  ngOnInit(): void {
    this.stocks = this.dataService.setData();
    if (this.stocks?.length !== 0) {
      this.loadingSubject.next(false);
    }

    this.subcription = this.dataService.stockSubject.subscribe(data => {
      this.stocks.push(data);
      this.totalItems = this.stocks.length;
      if (this.loading === true) {
        this.loadingSubject.next(false);
      }

    }
    )
    this.searchSub = this.dataService.searchSubject.subscribe(data => {
      this.stocks = [];
    })
    setInterval(()=>{
      this.updateDynamicStocks();
    },60000  )

    this.totalItems= this.stocks.length;

  }
  ngAfterViewInit(): void {
  }


  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
    this.searchSub?.unsubscribe();
    this.loadSub?.unsubscribe();
    this.dynamicStockSub?.forEach(data=>{
      data.unsubscribe();
    })

  }
  sortDirection(x: any): string {
    if (x.getAttribute('active') === 'true') {
      return x.getAttribute('data-order') === 'desc' ? this.downArrow : this.upArrow;
    }
    return "";
  }

  openStockDetails(symbol: string) {
    this.router.navigate([`stocksDetails/${symbol}`]);
  }
  pageBoundCorrection(event:any){
    console.log(event);
  }

  pageChange(event: number) {
    this.currentPage = event;
  }
  disableToolTip(description: string): boolean {
    return description.length > this.tooltip ? false : true
  }

  updateDynamicStocks(){
    this.dynamicStock =[];
    for(let x = 0; x< Math.min( this.itemsPerPage, this.stocks.length) ; x++){
      this.dynamicStock.push(this.stocks[x].symbol);
    }
    this.subcribeToDynamicStocks();
  }
  subcribeToDynamicStocks(){
    for(let x = 0 ; x < this.dynamicStock.length; x++){
      this.dynamicStockSub.push(
      this.dataService.getQuote(this.dynamicStock[x]).subscribe(data=>{
        if(this.dynamicStock[x] === this.stocks[x].symbol){
          this.stocks[x].changePercentage = data.dp;
          this.stocks[x].currentPrice =data.c;
          this.stocks[x].change =data.d;
        }
      }));
    }
  }


  itemsPerPageChanged(value :any  ){
    this.itemsPerPage = value.value;
  
  }

}
