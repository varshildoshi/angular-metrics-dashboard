import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {

  @Input() results: any[] = [];
  @Input() view: any[] = [];
  @Input() xAxis: any = true;
  @Input() yAxis: any = true;
  @Input() showXAxisLabel: any = true;
  @Input() showYAxisLabel: any = true;
  @Input() xAxisLabel: any = '';
  @Input() yAxisLabel: any = '';
  @Input() autoScale: any = true;
  @Input() showGridLines: any = true;
  @Input() tooltipDisabled: any = false;
  @Input() legend: any = true;
  @Input() legendPosition: any = '';
  @Input() legendTitle: any = '';
  @Input() scheme: any[] = [];
  @Input() chartColumns: any = {};

  lineChartData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.results) {
      this.lineChartData = this.generateChart(this.results);
    }
  }

  generateChart(data) {
    return [
      {
        name: 'Revenue',
        series: data.map(item => ({
          name: item[this.chartColumns.name],
          value: item[this.chartColumns.value]
        }))
      }
    ]
  }

}
