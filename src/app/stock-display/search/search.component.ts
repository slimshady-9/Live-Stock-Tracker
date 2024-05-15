import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataFetchService } from 'src/assets/services/data-fetch.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: string = "";

  results: any[] = [];
  temp: any[] = [];
  
  constructor(private dataService: DataFetchService) {

   }
  ngOnInit() {
  }


  search() {
  
    if (this.query.length === 0) {
      this.temp = [];
    }
    else {
      this.dataService.search(this.query).subscribe(data => {
        this.results = data['result'];
        console.log(this.results)
        this.temp = this.results.slice(0, 5);
      })
    }
  }
  searchStock() {
    this.temp=[];
    this.dataService.searchAndSet(this.results);
  }
}


