import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {

  @Input() results: any[] = [];
  @Input() view: any[] = [];
  @Input() xAxis: any = true;
  @Input() yAxis: any = true;
  @Input() showXAxisLabel: any = true;
  @Input() showYAxisLabel: any = true;
  @Input() xAxisLabel: any = '';
  @Input() yAxisLabel: any = '';
  @Input() showDataLabel: any = true;
  @Input() legend: any = true;
  @Input() legendPosition: any = '';
  @Input() legendTitle: any = '';
  @Input() scheme: any[] = [];
  @Input() chartColumns: any = {};

  barChartData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.results) {
      this.barChartData = this.generateChart(this.results);
    }
  }

  generateChart(data) {
    return data.map(item => ({
      name: item[this.chartColumns.name],
      value: item[this.chartColumns.value]
    }));
  }

}
