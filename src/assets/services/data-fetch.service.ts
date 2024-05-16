import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';

import * as saveAs from 'file-saver';
import { dataLocal } from '../models/data';
import { Stock } from '../models/stock.model';
// import { Moment } from 'moment';
import * as moment from 'moment';
const maxSearch = 18;

@Injectable({
  providedIn: 'root',
})
export class DataFetchService {
  apiKey: string = "";
  url: string = "https://finnhub.io/api/v1/";
  stockSubject = new Subject<Stock>();
  stocks: Stock[] = []
  searchSubject = new Subject<any>();
  subcription: Subscription | undefined;
  constructor(private http: HttpClient) {

  }
  setData() : Stock[]{
    if(this.stocks.length>0){
    
      return [...this.stocks];
    }
  
    let temp: any[] = [];
    this.subcription = this.search("A").subscribe(
      (data: any) => {
        temp = data.result;
        for (let i = 0; i < Math.min(maxSearch, temp.length); i++) {
          this.getQuote(temp[i].symbol).subscribe(
            (data: any) => {
              if (data.d !== null) {
                let x = new Stock(temp[i].description, temp[i].displaySymbol,
                  temp[i].symbol,
                  temp[i].type,
                  data.c,
                  data.d,
                  data.dp,
                  data.h,
                  data.l,
                  data.o,
                  data.pc);
                  this.stockSubject.next(x);
                  this.stocks.push(x);
              }
            },
            (err)=>{
            
              console.log(`Data on ${temp[i].symbol} not available`)
            }
            
          )

        }
      }
    )
    return [...this.stocks];
  }

  search(serachParameter: string) {
    const url = this.url + "search?q=" + serachParameter + "&token=" + this.apiKey;
    return this.http.get<any>(url);
  }
  getQuote(symbol: string) {
    const url = this.url + "quote?symbol=" + symbol + "&token=" + this.apiKey;
    return this.http.get<any>(url);
  }

  getLastNews(symbol: string) {
    return this.http.get(
      this.url +
        "company-news?symbol=" +
        symbol +
        "&from=" +
        moment()
          .subtract(5, "days")
          .format("Y-MM-DD") +
        "&to=" +
        moment().format("Y-MM-DD") +
        "&token="+
        this.apiKey
    );
  }


  searchAndSet(result:any[]){
    this.searchSubject.next("searched");
    this.stocks = [] ;
    for(let i =0 ; i<Math.min(maxSearch,result.length); i++){
      this.getQuote(result[i].symbol).subscribe(
        (data)=>{
          if(data.d !== null){
            let x = new Stock(result[i].description, result[i].displaySymbol,
              result[i].symbol,
              result[i].type,
              data.c,
              data.d,
              data.dp,
              data.h,
              data.l,
              data.o,
              data.pc);
              console.log(x);
              this.stockSubject.next(x);
              this.stocks.push(x);
          }
        }
        , (err)=>{
          console.log(`Data on ${result[i].symbol} not available`)
        }
      )
    }
  }

  getCompanyProfile(symbol: string) {
    return this.http.get(
      this.url + "stock/profile2?symbol=" + symbol + "&token=" + this.apiKey
    );
  }

  getChartData(symbol: string,res:string){
    let priorDate = moment().subtract(60, 'days').unix(); 
    if(res == 'M'){
      priorDate = moment().subtract(5,'years').unix()
    }
    else if(res == '60'){
      priorDate = moment().startOf('day').unix()
    }
    const durl = this.url + 
    "stock/candle?symbol="
    +symbol
    +"&resolution="
    +res
    +"&from="
    +priorDate
    +"&to="
    +moment().unix()
    +"&token="
    +this.apiKey;

    return this.http.get(durl)
  }

}
