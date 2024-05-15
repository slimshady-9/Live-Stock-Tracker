import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFetchService } from 'src/assets/services/data-fetch.service';
import { Observable } from "rxjs";
import { switchMap, takeWhile } from "rxjs/operators";
import { ApexChart } from 'ng-apexcharts';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})

export class StockDetailsComponent implements OnInit {
  private symbol : string = "";
  alive: boolean = true;
  cdata: any;
  resolution: string = "D"
  profile: any;
  Val:any;
  Time:any;
  news: any;
  articles:any[]=[];
  Typech: ApexChart["type"]='line'

  constructor(private route: ActivatedRoute,private serv: DataFetchService) {
    this.symbol = String(window.location.pathname).replace("/stocksDetails/",'');
    this.showChart(this.resolution)
    this.showProfile();
    this.showVal();
    this.showNews();
   }

  ngOnInit(): void {
  }

  showProfile() {
    this.profile = null;
    this.serv
      .getCompanyProfile(this.symbol)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        (data: any) => {
          if(data===null){
          }
          else{
            this.profile = data;
          }
        },
        err => console.log("Error Happened profile")
      );
  }

  showVal(){
    this.serv
      .getQuote(this.symbol)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        (data) => {
          if(data===null){
          }
          else{
            this.Val = data.c;
            this.Time = new Date(data.t*1000);
          }
        },
        err => console.log("Error Happened quote")
      );
  }

  showNews() {
    this.news = [];
    this.serv
      .getLastNews(this.symbol)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        (data) => {
          if(data === null){}
          else{
            this.news = data;
            for(let i =0;i<Math.min(5,this.news?.length );i++){
              this.articles.push(this.news[i])
            }
          }
        },
        err => console.log("Error Happened news")
      );
  }

  showChart(res:string){
    this.cdata = [];
    this.resolution= res;
    this.serv
      .getChartData(this.symbol, res)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        (data: any) => {
          this.cdata = data;
        },
        err => console.log("Error Happened histo")
      );
  }

  chartType(type:string){
    if(type =='Bar'){
      this.Typech='bar'
    }
    else{
      this.Typech='line'
    }
    this.showChart(this.resolution);
  }

}
