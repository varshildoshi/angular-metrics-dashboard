import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  @Input() results: any[] = [];
  @Input() view: any[] = [];
  @Input() scheme: any[] = [];
  @Input() legend: any = true;
  @Input() legendPosition: any = 'right';
  @Input() legendTitle: any = '';
  @Input() explodeSlices: any = false;
  @Input() tooltipDisabled: any = false;
  @Input() doughnut: any = false;
  @Input() labels: any = true;
  @Input() chartColumns: any = {};

  pieChartData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.results) {
      this.pieChartData = this.generateChart(this.results);
    }
  }

  generateChart(data) {
    return data.map(item => ({
      name: item[this.chartColumns.name],
      value: item[this.chartColumns.value]
    }));
  }

}
