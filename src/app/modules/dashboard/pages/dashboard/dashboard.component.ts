import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { debounceTime } from 'rxjs';
import { CommonFunction } from 'src/app/modules/core/common/common-function';
import { colorSets } from 'src/app/modules/core/models/colorSchemes';
import { DataService } from 'src/app/modules/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Bar Chart Variables
  barChartData: any[] = [];
  barChartColumns: any = {};
  barChartView: any[] = [700, 400];
  barChartConfig = {
    view: {
      width: 700,
      height: 400
    },
    xAxis: true,
    yAxis: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    xAxisLabel: '',
    yAxisLabel: '',
    showDataLabel: true,
    legend: true,
    legendPosition: 'right',
    legendTitle: 'Legend',
    colorScheme: {
      value: 'cool',
      domain: colorSets.find(e => e.value == 'cool')?.domain || []
    }
  };
  barChartConfigForm: FormGroup;
  barChartSelectedPalette: string[] = [];

  // Line Chart Variables
  lineChartData: any[] = [];
  lineChartColumns: any = {};
  lineChartView: any[] = [700, 400];
  lineChartConfig = {
    view: {
      width: 700,
      height: 400
    },
    xAxis: true,
    yAxis: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    xAxisLabel: '',
    yAxisLabel: '',
    autoScale: true,
    showGridLines: true,
    tooltipDisabled: false,
    legend: true,
    legendPosition: 'right',
    legendTitle: 'Legend',
    colorScheme: {
      value: 'cool',
      domain: colorSets.find(e => e.value == 'cool')?.domain || []
    }
  };
  lineChartConfigForm: FormGroup;
  lineChartSelectedPalette: string[] = [];

  // Pie Chart Variables
  pieChartData: any[] = [];
  pieChartColumns: any = {};
  pieChartView: any[] = [700, 400];
  pieChartConfig = {
    view: {
      width: 700,
      height: 400
    },
    legend: true,
    legendPosition: 'right',
    legendTitle: 'Legend',
    explodeSlices: false,
    tooltipDisabled: false,
    doughnut: false,
    labels: true,
    colorScheme: {
      value: 'cool',
      domain: colorSets.find(e => e.value == 'cool')?.domain || []
    }
  };
  pieChartConfigForm: FormGroup;
  pieChartSelectedPalette: string[] = [];

  // Selected chart, Config panel state, Config panel open-close
  selectedChart = 'barChart';
  panelOpenState = false;
  isConfigOpen = false;

  // ViewChild for angular material sidenav
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;

  colorSchemeArray = colorSets;

  constructor(
    private dataService: DataService,
    public fb: FormBuilder,
    public cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getDashboardDetails();
    this.initGraphForm();
  }

  initGraphForm() {
    // Bar Chart Form
    this.barChartConfigForm = this.fb.group({
      view: this.fb.group({
        width: [this.barChartView[0]],
        height: [this.barChartView[1]]
      }),
      xAxis: [this.barChartConfig.xAxis],
      yAxis: [this.barChartConfig.yAxis],
      showXAxisLabel: [this.barChartConfig.showXAxisLabel],
      showYAxisLabel: [this.barChartConfig.showYAxisLabel],
      xAxisLabel: [this.barChartConfig.xAxisLabel],
      yAxisLabel: [this.barChartConfig.yAxisLabel],
      showDataLabel: [this.barChartConfig.showDataLabel],
      legend: [this.barChartConfig.legend],
      legendPosition: [this.barChartConfig.legendPosition],
      legendTitle: [this.barChartConfig.legendTitle],
      colorScheme: [this.barChartConfig.colorScheme.value]
    });

    // Update bar chart color palette
    this.updateChartPalette('barChart', this.barChartConfig.colorScheme.value);
    this.barChartConfigForm.valueChanges.pipe(debounceTime(300)).subscribe((change) => {
      this.barChartConfig = change;
      if (change && change.colorScheme && change.colorScheme.length > 0) {
        this.updateChartPalette('barChart', change.colorScheme);
      }
    });

    // Line Chart Form
    this.lineChartConfigForm = this.fb.group({
      view: this.fb.group({
        width: [this.lineChartView[0]],
        height: [this.lineChartView[1]]
      }),
      xAxis: [this.lineChartConfig.xAxis],
      yAxis: [this.lineChartConfig.yAxis],
      showXAxisLabel: [this.lineChartConfig.showXAxisLabel],
      showYAxisLabel: [this.lineChartConfig.showYAxisLabel],
      xAxisLabel: [this.lineChartConfig.xAxisLabel],
      yAxisLabel: [this.lineChartConfig.yAxisLabel],
      autoScale: [this.lineChartConfig.autoScale],
      showGridLines: [this.lineChartConfig.showGridLines],
      tooltipDisabled: [this.lineChartConfig.tooltipDisabled],
      legend: [this.lineChartConfig.legend],
      legendPosition: [this.lineChartConfig.legendPosition],
      legendTitle: [this.lineChartConfig.legendTitle],
      colorScheme: [this.lineChartConfig.colorScheme.value]
    });

    // Update line chart color palette
    this.updateChartPalette('lineChart', this.lineChartConfig.colorScheme.value);
    this.lineChartConfigForm.valueChanges.pipe(debounceTime(300)).subscribe((change) => {
      this.lineChartConfig = change;
      if (change && change.colorScheme && change.colorScheme.length > 0) {
        this.updateChartPalette('lineChart', change.colorScheme);
      }
    });

    // Pie Chart Form
    this.pieChartConfigForm = this.fb.group({
      view: this.fb.group({
        width: [this.pieChartView[0]],
        height: [this.pieChartView[1]]
      }),
      legend: [this.pieChartConfig.legend],
      legendPosition: [this.pieChartConfig.legendPosition],
      legendTitle: [this.pieChartConfig.legendTitle],
      explodeSlices: [this.pieChartConfig.explodeSlices],
      tooltipDisabled: [this.pieChartConfig.tooltipDisabled],
      doughnut: [this.pieChartConfig.doughnut],
      labels: [this.pieChartConfig.labels],
      colorScheme: [this.pieChartConfig.colorScheme.value]
    });

    // Update pie chart color palette
    this.updateChartPalette('pieChart', this.pieChartConfig.colorScheme.value);
    this.pieChartConfigForm.valueChanges.pipe(debounceTime(300)).subscribe((change) => {
      this.pieChartConfig = change;
      if (change && change.colorScheme && change.colorScheme.length > 0) {
        this.updateChartPalette('pieChart', change.colorScheme);
      }
    });
  }

  updateChartPalette(type, value: string) {
    if (type == 'barChart') {
      const selected = colorSets.find(set => set.value === value);
      this.barChartSelectedPalette = selected?.domain || [];
      this.barChartConfig.colorScheme = { domain: selected.domain, value: value };
    } else if (type == 'lineChart') {
      const selected = colorSets.find(set => set.value === value);
      this.lineChartSelectedPalette = selected?.domain || [];
      this.lineChartConfig.colorScheme = { domain: selected.domain, value: value };
    } else if (type == 'pieChart') {
      const selected = colorSets.find(set => set.value === value);
      this.pieChartSelectedPalette = selected?.domain || [];
      this.pieChartConfig.colorScheme = { domain: selected.domain, value: value };
    }
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  toggleConfig() {
    this.isConfigOpen = !this.isConfigOpen;
  }

  getDashboardDetails() {
    this.dataService.getDashboardDetails().subscribe((res: any) => {
      this.barChartData = res.data.userEngagement.dailyActiveUsers;
      this.barChartColumns = { name: 'date', value: 'users' };

      this.lineChartData = res.data.salesOverview.monthlyBreakdown;
      this.lineChartColumns = { name: 'month', value: 'revenue' };

      this.pieChartData = res.data.geoDistribution;
      this.pieChartColumns = { name: 'country', value: 'users' };

    });
  }

  applyDimensions(type) {
    if (type == 'barChart') {
      const formValue = this.barChartConfigForm.value;
      this.barChartView = [];
      this.barChartView[0] = formValue.view.width;
      this.barChartView[1] = formValue.view.height;
    } else if (type == 'lineChart') {
      const formValue = this.lineChartConfigForm.value;
      this.lineChartView = [];
      this.lineChartView[0] = formValue.view.width;
      this.lineChartView[1] = formValue.view.height;
    } else if (type == 'pieChart') {
      const formValue = this.pieChartConfigForm.value;
      this.pieChartView = [];
      this.pieChartView[0] = formValue.view.width;
      this.pieChartView[1] = formValue.view.height;
    }

  }

  resetDimensions(type) {
    if (type == 'barChart') {
      this.barChartConfigForm.controls.view.get('width').setValue(700);
      this.barChartConfigForm.controls.view.get('height').setValue(400);
      this.applyDimensions('barChart');
    } else if (type == 'lineChart') {
      this.lineChartConfigForm.controls.view.get('width').setValue(700);
      this.lineChartConfigForm.controls.view.get('height').setValue(400);
      this.applyDimensions('lineChart');
    } else if (type == 'pieChart') {
      this.pieChartConfigForm.controls.view.get('width').setValue(700);
      this.pieChartConfigForm.controls.view.get('height').setValue(400);
      this.applyDimensions('pieChart');
    }

  }
}
