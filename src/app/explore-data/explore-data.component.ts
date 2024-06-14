
// import { Component } from '@angular/core';
// import { AgGridAngular } from 'ag-grid-angular';
// import { MatTableDataSource } from '@angular/material/table';
// import { Chart, ChartType, ChartOptions, TooltipItem } from 'chart.js';
// import {
//   ColDef,
//   GridApi,
//   GridReadyEvent,
//   RowSelectedEvent,
// } from 'ag-grid-community';

// @Component({
//   selector: 'app-explore-data',
//   templateUrl: './explore-data.component.html',
//   styleUrls: ['./explore-data.component.css'],
// })
// export class ExploreDataComponent {
//   public tableData: any[] = [
   
//   ]; // 初始化为空数组
//   displayedColumns = ['equipment1', 'name1', 'progressValue1', 'unit1'];
//   compact = false;
//   public rowData: any[] = [
//     { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 1, name: 'Valve Position', status: true, progressValue: '70', range: '0% - 100%', unit: '%', isUpdated: true },
//     { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 2, name: 'Hydraulic Fluid Pressure', status: true, progressValue: '70', range: '0 - 1000', unit: 'PSI', isUpdated: false },
//     { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 3, name: 'Stem Leakage', status: false, progressValue: 'Yes', range: 'Yes or No', unit: '', isUpdated: false },
//     { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 4, name: 'Seat Leakage', status: false, progressValue: 'Yes', range: 'Yes or No', unit: '', isUpdated: false },
//     { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 7, name: 'Sample Data 1', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//     { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 8, name: 'Sample Data 2', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//     { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 9, name: 'Sample Data 3', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//     { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 10, name: 'Sample Data 4', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//     { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 11, name: 'Sample Data 5', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//   ];

//   public columnDefs: ColDef[] = [
//     { field: 'equipment', checkboxSelection: true },
//     { field: 'name' },
//     { field: 'progressValue' },
//     { field: 'unit' },
//   ];

//   public defaultColDef: ColDef = {
//     filter: 'agTextColumnFilter',
//     floatingFilter: true,
//   };
//   public dataSource = new MatTableDataSource<any>(this.tableData);
//   public rowSelection: 'single' | 'multiple' = 'multiple';
//   public paginationPageSize = 10;
//   public paginationPageSizeSelector: number[] | boolean = [20, 10, 5];
//   public themeClass: string = 'ag-theme-quartz';
  
//   private gridApi!: GridApi;
//   public selectedData: any[] = [];
//   public selectedColumnDefs: ColDef[] = [];
//   title = '5 Line Chart Example';
  
//   // Chart data and configurations
//   data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [
//       {
//         label: 'line 1',
//         data: [10, 35, 20, 40, 35, 60],
//         borderColor: '#309840',
//         pointBackgroundColor: '#23662B', // 深色的点
//         fill: false,
//       },
//       {
//         label: 'line 2',
//         data: [15, 45, 25, 50, 30, 65],
//         borderColor: '#C71F76',

//         pointBackgroundColor: '#C71F76', // 深色的点
//         fill: false,
//       },
//       {
//         label: 'line 3',
//         data: [20, 30, 25, 60, 50, 70],
//         borderColor: '#3875C3',
//         pointBackgroundColor: '#1C4E89', // 深色的点
//         fill: false,
//       },
//       {
//         label: 'line 4',
//         data: [25, 55, 35, 45, 55, 75],
//         borderColor: '#8152CA',
//         pointBackgroundColor: '#442475', // 深色的点
//         fill: false,
//       },
//       {
//         label: 'line 5',
//         data: [30, 40, 50, 55, 65, 80],
//         borderColor: 'rgb(75, 192, 192)',
//         fill: false
//       }
//     ]
//   };
  

//   options: ChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//         labels: {
//           generateLabels: (chart) => {
//             const { data } = chart;
//             return data.datasets.map((dataset, i) => ({
//               text: dataset.label || '',
//               fillStyle: dataset.borderColor as string,
//               strokeStyle: dataset.borderColor as string,
//               hidden: !chart.isDatasetVisible(i),
//               index: i,
//               datasetIndex: i,
//               lineCap: 'butt',
//               lineDash: [] as number[],
//               lineDashOffset: 0,
//               lineJoin: 'miter',
//               lineWidth: 1,
//               pointStyle: 'circle',
//               rotation: 0,
//             }));
//           },
//         },
//       },
//       title: {
//         display: true,
//         text: this.title,
//         position: 'top',
//       },
//       tooltip: {
//         enabled: true,
//         callbacks: {
//           label: function (context) {
//             return context.dataset.label + ': ' + context.raw;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Months',
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Values',
//         },
//       },
//     },
//   };
  

//   onGridReady(params: GridReadyEvent) {
//     this.gridApi = params.api;
//   }

//   updateSelectedTable() {
//     this.selectedColumnDefs = this.columnDefs.map(colDef => ({ ...colDef, checkboxSelection: false }));
//     this.selectedData = this.selectedData.map(data => ({ ...data, checkboxSelection: false }));
//   }

//   // 当行被选中时触发
//   onRowSelected(event: RowSelectedEvent) {
//     const selectedRow = event.node.data;
//     if (event.node.isSelected()) {
//       // 将选中行数据添加到表格数据中
//       this.dataSource.data.push(selectedRow);
//       this.dataSource._updateChangeSubscription(); // 手动触发数据源变更通知
//     } else {
//       // 将取消选中的行数据从表格数据中移除
//       this.dataSource.data = this.dataSource.data.filter(row => row !== selectedRow);
//     }
//   }
// }

import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, ChartOptions } from 'chart.js';
import { ColDef, GridApi, GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';

@Component({
  selector: 'app-explore-data',
  templateUrl: './explore-data.component.html',
  styleUrls: ['./explore-data.component.css'],
})
export class ExploreDataComponent {
public selectedTimeGranularity: number = 15 * 60 * 1000; // Initialize to default value (15 minutes) or any other value you prefer

  
  public tableData: any[] = []; // 初始化为空数组
  displayedColumns = ['equipment', 'name', 'progressValue', 'unit'];
  compact = false;
  public rowData: any[] = [
    { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 1, name: 'Valve Position', status: true, progressValue: '70', range: '0% - 100%', unit: '%', isUpdated: true },
    { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 2, name: 'Hydraulic Fluid Pressure', status: true, progressValue: '70', range: '0 - 1000', unit: 'PSI', isUpdated: false },
    { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 3, name: 'Stem Leakage', status: false, progressValue: 'Yes', range: 'Yes or No', unit: '', isUpdated: false },
    { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 4, name: 'Seat Leakage', status: false, progressValue: 'Yes', range: 'Yes or No', unit: '', isUpdated: false },
    { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 7, name: 'Sample Data 1', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
    { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 8, name: 'Sample Data 2', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
    { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 9, name: 'Sample Data 3', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
    { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 10, name: 'Sample Data 4', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
    { equipment: '5" Hydraulic Actuator', equipmentID: '6', position: 11, name: 'Sample Data 5', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
  ];

  public columnDefs: ColDef[] = [
    { field: 'equipment', checkboxSelection: true },
    { field: 'name' },
    { field: 'progressValue' },
    { field: 'unit' },
  ];

  public defaultColDef: ColDef = {
    filter: 'agTextColumnFilter',
    floatingFilter: true,
  };
  public dataSource = new MatTableDataSource<any>(this.tableData);
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [20, 10, 5];
  public themeClass: string = 'ag-theme-quartz';

  private gridApi!: GridApi;
  public selectedData: any[] = [];
  public selectedColumnDefs: ColDef[] = [];
  title = '5 Line Chart Example';

  // Chart data and configurations
  data = {
    labels: this.generateTimeLabels(this.selectedTimeGranularity), // Update labels to time format
    datasets: [
      { label: 'line 1', data: this.generateRandomData(0, 100), borderColor: '#309840', pointBackgroundColor: '#23662B', fill: false, yAxisID: 'A' },
      { label: 'line 2', data: this.generateRandomData(0, 100), borderColor: '#C71F76', pointBackgroundColor: '#C71F76', fill: false, yAxisID: 'A' },
      { label: 'line 3', data: this.generateRandomData(), borderColor: '#3875C3', pointBackgroundColor: '#1C4E89', fill: false },
      { label: 'line 4', data: this.generateRandomData(0, 1000), borderColor: '#8152CA', pointBackgroundColor: '#442475', fill: false, yAxisID: 'C' },
      { label: 'line 5', data: this.generateRandomData(0, 1000), borderColor: 'rgb(75, 192, 192)', fill: false, yAxisID: 'C' }
    ]
  }

  options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          generateLabels: (chart: any) => {
            const { data } = chart;
            return data.datasets.map((dataset: any, i: number) => ({
              text: dataset.label || '',
              fillStyle: dataset.borderColor as string, // 使用与线条相同的颜色
              strokeStyle: dataset.borderColor as string, // 使用与线条相同的颜色
              hidden: !chart.isDatasetVisible(i),
              index: i,
              datasetIndex: i,
              lineCap: 'butt',
              lineDash: [] as number[],
              lineDashOffset: 0,
              lineJoin: 'miter',
              lineWidth: 1,
              pointStyle: 'circle',
              rotation: 0,
            }));
          },
        },
      },
      title: {
        display: true,
        text: this.title,
        position: 'top',
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context: any) {
            return context.dataset.label + ': ' + context.raw;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        A: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Values',
          },
        },
        C: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Values',
          },
        },
      },
    },
  } as ChartOptions;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  updateSelectedTable() {
    this.selectedColumnDefs = this.columnDefs.map(colDef => ({ ...colDef, checkboxSelection: false }));
    this.selectedData = this.selectedData.map(data => ({ ...data, checkboxSelection: false }));
  }

  onRowSelected(event: RowSelectedEvent) {
    const selectedRow = event.node.data;
    if (event.node.isSelected()) {
      this.dataSource.data.push(selectedRow);
      this.dataSource._updateChangeSubscription();
    } else {
      this.dataSource.data = this.dataSource.data.filter(row => row !== selectedRow);
    }
  }

  // Generate random data for the chart
  generateRandomData(min: number = 0, max: number = 100): number[] {
    const data: number[] = [];
    for (let i = 0; i < 6; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  }

  

  formatTime(time: Date): string {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  // 格式化日期
formatDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}
  // Time granularities
  timeGranularities = [
    { label: '15 Minutes', value: 15 * 60 * 1000 },
    { label: '1 Hour', value: 60 * 60 * 1000 },
    { label: '1 Day', value: 24 * 60 * 60 * 1000 },
    { label: '1 Month', value: 30 * 24 * 60 * 60 * 1000 }
  ];



  onTimeGranularityChange(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    const granularity = parseInt(selectedValue); // 将选定的值转换为数字
    this.selectedTimeGranularity = granularity;
    this.updateChartData();
  }
  


  // Method to update chart data based on selected time granularity
  updateChartData() {
    this.data.labels = this.generateTimeLabels(this.selectedTimeGranularity);
    // Update other chart data as needed...
  }

  // Existing code...

// 生成时间标签
generateTimeLabels(granularity: number): string[] {
  const labels: string[] = [];
  const now = new Date();

  // 根据粒度生成不同的时间标签
  if (granularity === 15 * 60 * 1000) { // 15分钟粒度
    for (let i = 5; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 15 * 60 * 1000); // 每隔15分钟生成一个标签
      const formattedTime = this.formatTime(time);
      labels.push(formattedTime);
    }
  } else if (granularity === 60 * 60 * 1000) { // 1小时粒度
    for (let i = 5; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000); // 每隔1小时生成一个标签
      const formattedTime = this.formatTime(time);
      labels.push(formattedTime);
    }
  } else if (granularity === 24 * 60 * 60 * 1000) { // 1天粒度
    for (let i = 5; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000); // 每隔1天生成一个标签
      const formattedTime = this.formatDate(time);
      labels.push(formattedTime);
    }
  } else if (granularity === 30 * 24 * 60 * 60 * 1000) { // 1个月粒度
    for (let i = 5; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 30 * 24 * 60 * 60 * 1000); // 每隔30天生成一个标签
      const formattedTime = this.formatDate(time);
      labels.push(formattedTime);
    }
  }

  return labels;
}


}
