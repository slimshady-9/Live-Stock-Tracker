import {
  Component,
  Input,
  OnInit,
  SimpleChange,
  ViewChild,
} from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexDataLabels,
  ApexFill,
  ApexPlotOptions,
  ApexStroke
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-show-chart',
  templateUrl: './show-chart.component.html',
  styleUrls: ['./show-chart.component.css'],
})
export class ShowChartComponent implements OnInit {
  @Input() chartData: any = [];
  @Input() res: String = 'D';
  @Input() chartType: ApexChart["type"] = 'line';
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: ChartOptions;
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: '',
          data: [],
        },
      ],
      chart: {
        height: 200,
        type: 'bar',
      },
      colors: [],
      title: {
        text: 'No Data Available',
      },
      yaxis: {},
      xaxis: {},
      dataLabels:{
        enabled : false
      },
      fill: {
        opacity: 1
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      }
      
    };
  }

  ngOnInit(): void {}
  ngOnChanges(change: SimpleChange) {
    
    for (let i = 0; i < this.chartData.t.length; i++) {
      const x = new Date(this.chartData.t[i] * 1000);
      this.chartData.t[i] = x.toLocaleDateString('en-US');
    }
    this.chartOptions = {
      series: [
        {
          name: 'Val $',
          data: this.chartData.c,
        },
        {
          name: 'High $',
          data: this.chartData.h,
        },
        {
          name: 'Low $',
          data: this.chartData.l,
        },
      ],
      chart: {
        height: 300,
        type: this.chartType,
      },
      colors: ['#2E93fA', '#66DA26', '#546E7A'],
      title: {
        text: 'Price Movement',
      },
      yaxis: {
        title: {
          text: 'Price',
        },
      },
      xaxis: {
        categories: this.chartData.t,
        type: 'datetime',
      },
      dataLabels:{
        enabled : false,
      },
      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      }
    };
  }
}
