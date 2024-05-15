import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { dataLocal } from 'src/assets/models/data';
import { Stock } from 'src/assets/models/stock.model';
import { DataFetchService } from 'src/assets/services/data-fetch.service';

@Component({
  selector: 'app-grid-display',
  templateUrl: './grid-display.component.html',
  styleUrls: ['./grid-display.component.css']
})
export class GridDisplayComponent implements OnInit, OnDestroy {
  public stocks: Stock[] = [];
  private subcription: Subscription | undefined;
  private searchSub: Subscription | undefined;
  public loading: boolean;
  private loadSub: Subscription | undefined;

  public itemsPerPage: number;
  public currentPage: number;
  public totalItems: number;
  public loadingSubject: Subject<boolean>;
  public tooltip: number = 15;
  public itemPerPageOptions: Array<number> = [4, 8, 12, 16, 20];
  constructor(private dataService: DataFetchService, private router: Router) {
    this.loading = true;
    this.itemsPerPage = this.itemPerPageOptions[0];
    this.currentPage = 1;
    this.totalItems = 0;
    this.loadingSubject = new Subject<any>();
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
    this.subcription = this.dataService.stockSubject.subscribe(
      (data: Stock) => {
        this.stocks.push(data);
        this.loadingSubject.next(false);
        this.totalItems = this.stocks.length;
      }
    )
    this.searchSub = this.dataService.searchSubject.subscribe(
      (data) => {
        this.stocks = [];
      }
    )
    this.totalItems = this.stocks.length;
  }
  details(symbol: string) {
    // this.router.navigate(["stocksDetails",symbol]);
    console.log(symbol);
    setInterval(() => { console.log("hello") }, 2000);
    this.router.navigate(["stocksDetails", "/symbol=", symbol]);
  }
  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
    this.searchSub?.unsubscribe();
    this.loadSub?.unsubscribe();
  }

  pageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  itemsPerPageChanged(value: any) {
    this.itemsPerPage = value.value;
  }
  disableToolTip(description: string): boolean {
    return description.length > this.tooltip ? false : true
  }
}
