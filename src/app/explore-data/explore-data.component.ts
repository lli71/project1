// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { ChartData, ChartOptions } from 'chart.js';
// import { ColDef, GridApi, GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
// import { DataTableServiceService } from '../data-table-service.service'; // 确保路径正确
// import { forkJoin } from 'rxjs';

// @Component({
//   selector: 'app-explore-data',
//   templateUrl: './explore-data.component.html',
//   styleUrls: ['./explore-data.component.css'],
// })
// export class ExploreDataComponent implements OnInit {
//   public selectedTimeGranularity: number = 15 * 60 * 1000; // Initialize to default value (15 minutes)
//   public tableData: any[] = [];
//   public displayedColumns = ['equipment', 'name', 'progressValue', 'unit'];
//   public compact = false;

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
//   public title = 'Line Chart Example';
//   // Time granularities
//   timeGranularities = [
//     { label: '15 Minutes', value: 15 * 60 * 1000 },
//     { label: '1 Hour', value: 60 * 60 * 1000 },
//     { label: '1 Day', value: 24 * 60 * 60 * 1000 },
//     { label: '1 Month', value: 30 * 24 * 60 * 60 * 1000 }
//   ];

//   // Chart data and configurations
//   public data: ChartData<'line', number[], string> = {
//     labels: [],
//     datasets: []
//   };

//   public options: ChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//         labels: {
//           generateLabels: (chart: any) => {
//             const { data } = chart;
//             return data.datasets.map((dataset: any, i: number) => ({
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
//           label: function (context: any) {
//             return context.dataset.label + ': ' + context.raw;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Time',
//         },
//       },
//       y: {
//         A: {
//           type: 'linear',
//           position: 'left',
//           title: {
//             display: true,
//             text: 'Annulus Temperature/Annulus Pressure',
//           },
//         },
//         B: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Supply Voltage/Supply Current',
//           },
//         },
//         C: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Status',
//           },
//           grid: {
//             drawOnChartArea: false,
//           },
//         },
//       },
//     },
//   } as ChartOptions;

//   constructor(private dataTableService: DataTableServiceService) {}

//   ngOnInit() {
//     this.fetchChartData();
//   }

//   onGridReady(params: GridReadyEvent) {
//     this.gridApi = params.api;
//   }

//   updateSelectedTable() {
//     this.selectedColumnDefs = this.columnDefs.map((colDef) => ({ ...colDef, checkboxSelection: false }));
//     this.selectedData = this.selectedData.map((data) => ({ ...data, checkboxSelection: false }));
//   }

//   onRowSelected(event: RowSelectedEvent) {
//     const selectedRow = event.node.data;
//     if (event.node.isSelected()) {
//       this.dataSource.data.push(selectedRow);
//       this.dataSource._updateChangeSubscription();
//     } else {
//       this.dataSource.data = this.dataSource.data.filter((row) => row !== selectedRow);
//     }
//   }

//   onTimeGranularityChange(event: any) {
//     const selectElement = event.target as HTMLSelectElement;
//     const selectedValue = selectElement.value;
//     const granularity = parseInt(selectedValue);
//     this.selectedTimeGranularity = granularity;
//     this.updateChartData();
//   }

//   updateChartData() {
//     this.data.labels = this.generateTimeLabels(this.selectedTimeGranularity);
//     this.fetchChartData();
//   }

//   generateTimeLabels(granularity: number): string[] {
//     const labels: string[] = [];
//     const now = new Date();

//     if (granularity === 15 * 60 * 1000) {
//       for (let i = 5; i >= 0; i--) {
//         const time = new Date(now.getTime() - i * 15 * 60 * 1000);
//         labels.push(this.formatTime(time));
//       }
//     } else if (granularity === 60 * 60 * 1000) {
//       for (let i = 5; i >= 0; i--) {
//         const time = new Date(now.getTime() - i * 60 * 60 * 1000);
//         labels.push(this.formatTime(time));
//       }
//     } else if (granularity === 24 * 60 * 60 * 1000) {
//       for (let i = 5; i >= 0; i--) {
//         const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
//         labels.push(this.formatDate(time));
//       }
//     } else if (granularity === 30 * 24 * 60 * 60 * 1000) {
//       for (let i = 5; i >= 0; i--) {
//         const time = new Date(now.getTime() - i * 30 * 24 * 60 * 60 * 1000);
//         labels.push(this.formatDate(time));
//       }
//     }

//     return labels;
//   }

//   formatTime(time: Date): string {
//     const hours = time.getHours().toString().padStart(2, '0');
//     const minutes = time.getMinutes().toString().padStart(2, '0');
//     return `${hours}:${minutes}`;
//   }

//   formatDate(date: Date): string {
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${month}/${day}`;
//   }

//   fetchChartData() {
//     const endTime = new Date().toISOString();
//     const startTime = new Date(Date.now() - this.selectedTimeGranularity * 6).toISOString();

//     const tagNames = [
//       'Annulus Temperature',
//       'Annulus Pressure',
//       'Supply Voltage',
//       'Supply Current',
//       'Status'
//     ];

//     const requests = tagNames.map(tagName => this.dataTableService.getData(tagName, startTime, endTime));

//     forkJoin(requests).subscribe(results => {
//       this.data.datasets = results.map((result, index) => {
//         return {
//           label: tagNames[index],
//           data: result.deviceTagData.map((entry: any) => entry.value.doubleValue || entry.value.stringValue),
//           borderColor: this.getColor(index),
//           fill: false,
//           yAxisID: this.getYAxisID(tagNames[index]),
//         };
//       });
//     });
//   }

//   getColor(index: number): string {
//     const colors = ['#309840', '#C71F76', '#3875C3', '#8152CA', 'rgb(75, 192, 192)'];
//     return colors[index % colors.length];
//   }

//   getYAxisID(tagName: string): string {
//     switch (tagName) {
//       case 'Annulus Temperature':
//       case 'Annulus Pressure':
//         return 'A';
//       case 'Supply Voltage':
//       case 'Supply Current':
//         return 'B';
//       case 'Status':
//         return 'C';
//       default:
//         return 'A';
//     }
//   }
// }
//V2 with set start time
// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { ChartData, ChartOptions } from 'chart.js';
// import { ColDef, GridApi, GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
// import { DataTableServiceService } from '../data-table-service.service'; // 确保路径正确
// import { forkJoin } from 'rxjs';

// @Component({
//   selector: 'app-explore-data',
//   templateUrl: './explore-data.component.html',
//   styleUrls: ['./explore-data.component.css'],
// })
// export class ExploreDataComponent implements OnInit {
//   public selectedTimeGranularity: number = 30 * 1000; // 默认时间粒度为30秒
//   public tableData: any[] = [];
//   public displayedColumns = ['equipment', 'name', 'progressValue', 'unit'];
//   public compact = false;
//   public loading: boolean = true; // Loading state
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
//   timeGranularities = [
//     { label: '30 Seconds', value: 30 * 1000 },
//     { label: '1 Hour', value: 60 * 60 * 1000 },
//     { label: '1 Day', value: 24 * 60 * 60 * 1000 },
//     { label: '1 Month', value: 30 * 24 * 60 * 60 * 1000 }
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
//   public title = 'Line Chart Example';

//   // Chart data and configurations
//   public data: ChartData<'line', number[], string> = {
//     labels: [],
//     datasets: []
//   };

//   public options: ChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//         labels: {
//           generateLabels: (chart: any) => {
//             const { data } = chart;
//             return data.datasets.map((dataset: any, i: number) => ({
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
//           label: function (context: any) {
//             return context.dataset.label + ': ' + context.raw;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Time',
//         },
//       },
//       y: {
//         A: {
//           type: 'linear',
//           position: 'left',
//           title: {
//             display: true,
//             text: 'Y Axis A',
//           },
//         },
//         B: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis B',
//           },
//         },
//         C: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis C',
//           },
//         },
//         D: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis D',
//           },
//         },
//         E: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis E',
//           },
//         },
//       },
//     },
//   } as ChartOptions;

//   constructor(private dataTableService: DataTableServiceService) {}

//   ngOnInit() {
//     this.updateChartData();
//   }

//   onGridReady(params: GridReadyEvent) {
//     this.gridApi = params.api;
//   }

//   updateSelectedTable() {
//     this.selectedColumnDefs = this.columnDefs.map((colDef) => ({ ...colDef, checkboxSelection: false }));
//     this.selectedData = this.selectedData.map((data) => ({ ...data, checkboxSelection: false }));
//   }

//   onRowSelected(event: RowSelectedEvent) {
//     const selectedRow = event.node.data;
//     if (event.node.isSelected()) {
//       this.dataSource.data.push(selectedRow);
//       this.dataSource._updateChangeSubscription();
//     } else {
//       this.dataSource.data = this.dataSource.data.filter((row) => row !== selectedRow);
//     }
//   }

//   updateChartData() {
//     const startTime = new Date('2024-06-22T23:34:01.150500431Z');
//     this.data.labels = this.generateTimeLabels(startTime, 6);
//     this.fetchChartData(startTime);
//   }

//   generateTimeLabels(startTime: Date, count: number): string[] {
//     const labels: string[] = [];
//     for (let i = 0; i < count; i++) {
//       const time = new Date(startTime.getTime() + i * this.selectedTimeGranularity);
//       labels.push(time.toISOString()); // Use ISO string to ensure full precision
//     }
//     return labels;
//   }
  
//   formatTime(time: Date): string {
//     const hours = time.getHours().toString().padStart(2, '0');
//     const minutes = time.getMinutes().toString().padStart(2, '0');
//     const seconds = time.getSeconds().toString().padStart(2, '0');
//     return `${hours}:${minutes}:${seconds}`;
//   }

//   fetchChartData(startTime: Date) {
//     const endTime = new Date().toISOString();

//     const tagNames = [
//       'Annulus Temperature',
//       'Annulus Pressure',
//       'Supply Voltage',
//       'Supply Current',
//       'Status'
//     ];

//     const requests = tagNames.map(tagName => this.dataTableService.getData(tagName, startTime.toISOString(), endTime));

//     forkJoin(requests).subscribe(results => {
//       this.data.datasets = results.map((result, index) => {
//         return {
//           label: tagNames[index],
//           data: result.deviceTagData.map((entry: any) => entry.value.doubleValue || entry.value.stringValue),
//           borderColor: this.getColor(index),
//           fill: false,
//           yAxisID: this.getYAxisID(tagNames[index]), // Ensure correct yAxisID
//         };
//       });
//       console.log(results)
//       this.loading = false; // Set loading to false once data is fetched
//     });
//   }

//   getColor(index: number): string {
//     const colors = ['#309840', '#C71F76', '#3875C3', '#8152CA', 'rgb(75, 192, 192)'];
//     return colors[index % colors.length];
//   }
//   onTimeGranularityChange(event: any) {
//     const selectElement = event.target as HTMLSelectElement;
//     const selectedValue = selectElement.value;
//     const granularity = parseInt(selectedValue);
//     this.selectedTimeGranularity = granularity;
//     this.updateChartData();
//   }
//   getYAxisID(tagName: string): string {
//     switch (tagName) {
//       case 'Annulus Temperature':
//         return 'A';
//       case 'Annulus Pressure':
//         return 'B';
//       case 'Supply Voltage':
//         return 'C';
//       case 'Supply Current':
//         return 'D';
//       case 'Status':
//         return 'E';
//       default:
//         return 'A'; // 默认使用 y 轴 A
//     }
//   }
// }
//In hour format
// import { Component, OnInit } from '@angular/core';
// import { Chart, ChartData, ChartOptions,registerables } from 'chart.js';
// import 'chartjs-adapter-date-fns';
// import { DataTableServiceService } from '../data-table-service.service';
// import { forkJoin } from 'rxjs';
// import zoomPlugin from 'chartjs-plugin-zoom';
// Chart.register(zoomPlugin);
// @Component({
//   selector: 'app-explore-data',
//   templateUrl: './explore-data.component.html',
//   styleUrls: ['./explore-data.component.css'],
// })
// export class ExploreDataComponent implements OnInit {
//   public selectedTimeGranularity: number = 30 * 1000; // 默认时间粒度为30秒
//   public loading: boolean = true; // Loading state
//   public title = 'Line Chart Example';
//   startTime = new Date('2024-06-23T23:34:01.150500431Z');
//   endTime = new Date(this.startTime.getTime() + 24 * 60 * 60 * 1000).toISOString();
//   public data: ChartData<'line', any, string> = {
//     labels: [], // 不再设置 x 轴标签
//     datasets: []
//   };


//   public options: ChartOptions = {
//     responsive: true,
//     plugins: {
//       zoom: {
//         pan: {
//           enabled: true,
//           mode: 'x',
//         },
//         zoom: {
//            pan: {
//               enabled: true,
//               mode: 'x',
//             },
//           wheel: {
//             enabled: true,
//           },
//           pinch: {
//             enabled: true,
//           },
//           mode: 'x', // 可以是 'x', 'y', 或 'xy'
//         },
//       },
//       legend: {
//         display: true,
//         position: 'top',
//         labels: {
//           generateLabels: (chart: any) => {
//             const { data } = chart;
//             return data.datasets.map((dataset: any, i: number) => ({
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
//           label: function (tooltipItem: any) {
//             const datasetLabel = tooltipItem.dataset.label || '';
//             const xValue = tooltipItem.raw.x instanceof Date ? tooltipItem.raw.x.toISOString() : tooltipItem.raw.x;
//             const yValue = tooltipItem.raw.y;
      
//             return `${datasetLabel}: (Time: ${xValue}, Value: ${yValue})`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         type: 'time', // 使用时间刻度
//         time: {
//           unit: 'hour', // 时间单位为秒
//           //stepSize: 1, // 每隔10个数据点显示一个刻度
//           displayFormats: {
//             hour: 'yyyy-MM-dd HH:mm' // 显示格式为小时、分钟、秒
//           },
//           tooltipFormat: 'yyyy-MM-dd HH:mm:ss',// 提示工具提示格式
//           },
//           min: this.startTime.toISOString(),
//           max: this.endTime,
//           ticks: {
//             callback: function(value, index, values) {
//               // x轴显示数量
//               if (index % 1 === 0) {
//                 return value; // Return the formatted timestamp
//               } else {
//                 return ''; // Hide the label for other data points
//               }
//             }
//             // maxTicksLimit: 10,
//           }
//         },
//       y: {
//         yAxisA: {
//           type: 'linear',
//           position: 'left',
//           title: {
//             display: true,
//             text: 'Y Axis A',
//           },
//         },
//         yAxisB: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis B',
//           },
//         },
//         yAxisC: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis C',
//           },
//         },
//         yAxisD: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis D',
//           },
//         },
//         yAxisE: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis E',
//           },
//         },
//         yAxisF: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: false,
//             text: 'Y Axis F',
//           },
//         },
//       },
//     },
//   } as ChartOptions;
//   public chartInstance: Chart;

//   constructor(private dataTableService: DataTableServiceService) {

//   }

//   ngOnInit() {
//     this.updateChartData();
//   }

//   updateChartData() {
//     //const startTime = new Date('2024-06-23T23:34:01.150500431Z');
//     this.fetchChartData(this.startTime);
//     if (this.chartInstance) {
//       (this.chartInstance as any).downsample(20); // 手动降采样到200个数据点
//   }
//   }
// //normal retrive
// fetchChartData(startTime: Date) {
//   //const endTime = new Date().toISOString();
//   //const endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000).toISOString();
//   const tagNames = [
//     'Annulus Temperature',
//     'Annulus Pressure',
//     'Supply Voltage',
//     'Supply Current',
//     'Status'
//   ];

//   const requests = tagNames.map(tagName => this.dataTableService.getData(tagName, startTime.toISOString(), this.endTime));

//   forkJoin(requests).subscribe(results => {
//     this.data.datasets = results.map((result, index) => {
//       const rawData = result.deviceTagData.map((entry: any) => ({
//         x: new Date(entry.timestamps.serverTimestamp), // Use serverTimestamp here
//         y: entry.value.doubleValue || entry.value.stringValue
//       }));
      
//       // 降采样到最多 20 个数据点
//       const sampledData = this.downsample(rawData, 40);

//       return {
//         label: tagNames[index],
//         data: sampledData,
//         borderColor: this.getColor(index),
//         borderWidth: 2,
//         pointBackgroundColor:this.getColor(index),
//         fill: false,
//         yAxisID: this.getYAxisID(tagNames[index]), // Ensure correct yAxisID
//       };
//     });

//     if (this.chartInstance) {
//       this.chartInstance.update();
//     }
//     this.loading = false; // Set loading to false once data is fetched
//   }, error => {
//     console.error('Failed to fetch chart data', error);
//     this.loading = false;
//   });
// }

// downsample(data: any[], maxPoints: number): any[] {
//   if (data.length <= maxPoints) {
//     return data;
//   }

//   const sampled = [];
//   const interval = Math.ceil(data.length / maxPoints);

//   for (let i = 0; i < data.length; i += interval) {
//     sampled.push(data[i]);
//   }

//   return sampled;
// }

   
//   getColor(index: number): string {
//     // Return color based on index
//     const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
//     return colors[index % colors.length];
//   }

//   getYAxisID(tagName: string): string {
//     // Return yAxisID based on tag name
//     switch (tagName) {
//       case 'Annulus Temperature':
//         return 'yAxisA';
//       case 'Annulus Pressure':
//         return 'yAxisB';
//       case 'Supply Voltage':
//         return 'yAxisC';
//       case 'Supply Current':
//         return 'yAxisD';
//       case 'Status':
//         return 'yAxisE';
//       default:
//         return 'None';
//     }
//   }
// }
//数据缩放点成功
// import { Component, OnInit } from '@angular/core';
// import { Chart, ChartData, ChartOptions } from 'chart.js';
// import 'chartjs-adapter-date-fns';
// import { DataTableServiceService } from '../data-table-service.service';
// import { forkJoin } from 'rxjs';
// import zoomPlugin from 'chartjs-plugin-zoom';

// Chart.register(zoomPlugin);

// @Component({
//   selector: 'app-explore-data',
//   templateUrl: './explore-data.component.html',
//   styleUrls: ['./explore-data.component.css'],
// })
// export class ExploreDataComponent implements OnInit {
//   public selectedTimeGranularity: number = 30 * 1000; // 默认时间粒度为30秒
//   public loading: boolean = true; // Loading state
//   public title = 'Line Chart Example';

//   public data: ChartData<'line', any, string> = {
//     labels: [], // 不再设置 x 轴标签
//     datasets: []
//   };

//   public options: ChartOptions = {
//     responsive: true,
//     plugins: {
//       zoom: {
//         pan: {
//           enabled: true,
//           mode: 'x',
//         },
//         zoom: {
//           wheel: {
//             enabled: true,
//           },
//           pinch: {
//             enabled: true,
//           },
//           mode: 'x', // 可以是 'x', 'y', 或 'xy'
//           onZoomComplete: ({ chart }) => {
//             this.handleZoom(chart);
//           },
//         },
//       },
//       legend: {
//         display: true,
//         position: 'top',
//         labels: {
//           generateLabels: (chart: any) => {
//             const { data } = chart;
//             return data.datasets.map((dataset: any, i: number) => ({
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
//           label: function (tooltipItem: any) {
//             const datasetLabel = tooltipItem.dataset.label || '';
//             const xValue = tooltipItem.raw.x instanceof Date ? tooltipItem.raw.x.toISOString() : tooltipItem.raw.x;
//             const yValue = tooltipItem.raw.y;
      
//             return `${datasetLabel}: (Time: ${xValue}, Value: ${yValue})`;
//           },
//         },
//       },
//       decimation: {
//         enabled: true,
//         algorithm: 'lttb', // 使用 'lttb' 算法进行降采样
//         samples: 20, // 初始目标样本数量
//       },
//     },
//     scales: {
//       x: {
//         type: 'time',
//         time: {
//           unit: 'second',
//           stepSize: 10,
//           displayFormats: {
//             second: 'HH:mm:ss',
//           },
//           tooltipFormat: 'HH:mm:ss',
//         },
//       },
//       y: {
//         yAxisA: {
//           type: 'linear',
//           position: 'left',
//           title: {
//             display: true,
//             text: 'Y Axis A',
//           },
//         },
//         yAxisB: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis B',
//           },
//         },
//         yAxisC: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis C',
//           },
//         },
//         yAxisD: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis D',
//           },
//         },
//         yAxisE: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis E',
//           },
//         },
//       },
//     },
//   } as ChartOptions;

//   public chartInstance: Chart;

//   constructor(private dataTableService: DataTableServiceService) {}

//   ngOnInit() {
//     this.updateChartData();
//   }

//   updateChartData() {
//     const startTime = new Date('2024-06-22T23:34:01.150500431Z');
//     this.fetchChartData(startTime);
//   }

//   fetchChartData(startTime: Date) {
//     const endTime = new Date().toISOString();

//     const tagNames = [
//       'Annulus Temperature',
//       'Annulus Pressure',
//       'Supply Voltage',
//       'Supply Current',
//       'Status'
//     ];

//     const requests = tagNames.map(tagName => this.dataTableService.getData(tagName, startTime.toISOString(), endTime));

//     forkJoin(requests).subscribe(results => {
//       this.data.datasets = results.map((result, index) => {
//         const rawData = result.deviceTagData.map((entry: any) => ({
//           x: new Date(entry.timestamps.serverTimestamp), // Use serverTimestamp here
//           y: entry.value.doubleValue || entry.value.stringValue
//         }));
        
//         // 初始降采样到最多 200 个数据点
//         const sampledData = this.downsample(rawData, 20);

//         return {
//           label: tagNames[index],
//           data: sampledData,
//           borderColor: this.getColor(index),
//           fill: false,
//           yAxisID: this.getYAxisID(tagNames[index]), // Ensure correct yAxisID
//         };
//       });

//       if (this.chartInstance) {
//         this.chartInstance.update();
//       }
//       this.loading = false; // Set loading to false once data is fetched
//     }, error => {
//       console.error('Failed to fetch chart data', error);
//       this.loading = false;
//     });
//   }

//   downsample(data: any[], maxPoints: number): any[] {
//     if (data.length <= maxPoints) {
//       return data;
//     }

//     const sampled = [];
//     const interval = Math.ceil(data.length / maxPoints);

//     for (let i = 0; i < data.length; i += interval) {
//       sampled.push(data[i]);
//     }

//     return sampled;
//   }

//   handleZoom(chart: any) {
//     const xScale = chart.scales['x'];
//     const maxPoints = 200; // 放大后的数据点数量上限
//     const visibleDataPoints: any[] = [];
  
//     // 遍历数据集，筛选出在当前 x 轴范围内的所有数据点
//     chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
//       const filteredData = dataset.data.filter((dataPoint: any) => {
//         const xValue = new Date(dataPoint.x).getTime();
//         return xValue >= xScale.min && xValue <= xScale.max;
//       });
  
//       visibleDataPoints.push(...filteredData);
//     });
  
//     // 计算当前显示的数据点数量
//     const currentVisibleCount = visibleDataPoints.length;
  
//     // 根据当前显示的数据点数量调整数据点的显示状态
//     if (currentVisibleCount > maxPoints) {
//       // 如果当前显示的数据点数量超过了上限，需要调整显示状态以保持在上限内
//       this.adjustDataPointsVisibility(chart, maxPoints);
//     } else {
//       // 如果当前显示的数据点数量小于或等于上限，显示所有数据点
//       this.showAllDataPoints(chart);
//     }
  
//     // 补充显示不足的数据点
//     if (currentVisibleCount < maxPoints) {
//       this.showDeficitDataPoints(chart, maxPoints - currentVisibleCount);
//     }
  
//     chart.update();
//   }
  
//   showDeficitDataPoints(chart: any, count: number) {
//     let shownCount = 0;
  
//     chart.data.datasets.forEach((dataset: any) => {
//       dataset.data.forEach((dataPoint: any) => {
//         if (dataPoint.hidden && shownCount < count) {
//           dataPoint.hidden = false;
//           shownCount++;
//         }
//       });
//     });
//   }
  
//   adjustDataPointsVisibility(chart: any, maxPoints: number) {
//     let visibleCount = 0;
  
//     chart.data.datasets.forEach((dataset: any) => {
//       dataset.data.forEach((dataPoint: any) => {
//         const xValue = new Date(dataPoint.x).getTime();
//         if (xValue >= chart.scales['x'].min && xValue <= chart.scales['x'].max) {
//           if (visibleCount < maxPoints) {
//             dataPoint.hidden = false; // 在当前缩放范围内显示数据点
//             visibleCount++;
//           } else {
//             dataPoint.hidden = true; // 超过上限的数据点隐藏
//           }
//         } else {
//           dataPoint.hidden = true; // 不在当前缩放范围内的数据点隐藏
//         }
//       });
//     });
//   }
  
//   showAllDataPoints(chart: any) {
//     chart.data.datasets.forEach((dataset: any) => {
//       dataset.data.forEach((dataPoint: any) => {
//         dataPoint.hidden = false; // 显示所有数据点
//       });
//     });
//   }
  
//   hideExcessDataPoints(chart: any, count: number) {
//     let hiddenCount = 0;
  
//     chart.data.datasets.forEach((dataset: any) => {
//       dataset.data.forEach((dataPoint: any) => {
//         if (!dataPoint.hidden && hiddenCount < count) {
//           dataPoint.hidden = true;
//           hiddenCount++;
//         }
//       });
//     });
//   }
  
  
  

//   getColor(index: number): string {
//     // Return color based on index
//     const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
//     return colors[index % colors.length];
//   }

//   getYAxisID(tagName: string): string {
//     // Return yAxisID based on tag name
//     switch (tagName) {
//       case 'Annulus Temperature':
//         return 'yAxisA';
//       case 'Annulus Pressure':
//         return 'yAxisB';
//       case 'Supply Voltage':
//         return 'yAxisC';
//       case 'Supply Current':
//         return 'yAxisD';
//       case 'Status':
//         return 'yAxisE';
//       default:
//         return 'yAxisA';
//     }
//   }
// }
//Modify time range
// import { Component, OnInit } from '@angular/core';
// import { Chart, ChartData, ChartOptions } from 'chart.js';
// import 'chartjs-adapter-date-fns';
// import { DataTableServiceService } from '../data-table-service.service';
// import { FormControl, Validators } from '@angular/forms';
// import { forkJoin } from 'rxjs';
// import zoomPlugin from 'chartjs-plugin-zoom';
// Chart.register(zoomPlugin);

// @Component({
//   selector: 'app-explore-data',
//   templateUrl: './explore-data.component.html',
//   styleUrls: ['./explore-data.component.css'],
// })
// export class ExploreDataComponent implements OnInit {
//   public title = 'Line Chart Example';
//   startTimeInput: FormControl;
//   startTime: Date = new Date('2024-06-23T23:34:01.150500431Z'); // Initialize startTime here
//   endTime: Date = new Date(this.startTime.getTime() + 24 * 60 * 60 * 1000)
//   loading: boolean = true;
//   selectedTimeGranularity: number = 86400000; // Default to 1 Day in milliseconds
//   data: ChartData<'line', any, string> = {
//     labels: [], // No longer setting x-axis labels
//     datasets: []
//   };
//   options: ChartOptions = {
//     responsive: true,
//     plugins: {
//       zoom: {
//         pan: {
//           enabled: true,
//           mode: 'x',
//         },
//         zoom: {
//           wheel: {
//             enabled: true,
//           },
//           pinch: {
//             enabled: true,
//           },
//           mode: 'x', // Can be 'x', 'y', or 'xy'
//         },
//       },
//       legend: {
//         display: true,
//         position: 'top',
//         labels: {
//           generateLabels: (chart: any) => {
//             const { data } = chart;
//             return data.datasets.map((dataset: any, i: number) => ({
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
//         text: 'Line Chart Example',
//         position: 'top',
//       },
//       tooltip: {
//         enabled: true,
//         callbacks: {
//           label: function (tooltipItem: any) {
//             const datasetLabel = tooltipItem.dataset.label || '';
//             const xValue = tooltipItem.raw.x instanceof Date ? tooltipItem.raw.x.toISOString() : tooltipItem.raw.x;
//             const yValue = tooltipItem.raw.y;
//             console.log('xValue:', xValue, 'type:', typeof xValue); // Debug log for xValue
//             console.log('yValue:', yValue, 'type:', typeof yValue); // Debug log for yValue
//             return `${datasetLabel}: (Time: ${xValue}, Value: ${yValue})`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         type: 'time',
//         time: {
//           unit: 'hour', // Default, will be updated dynamically
//           displayFormats: {
//             hour: 'yyyy-MM-dd HH:mm',
//             minute: 'yyyy-MM-dd HH:mm',
//             second: 'yyyy-MM-dd HH:mm:ss',
//           },
//           tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
//           min: this.startTime.toISOString(),
//           max: this.endTime,
//         },
//         ticks: {
//           callback: (value, index, values) => { // Arrow function preserves `this` context
//             switch (this.getChartTimeUnit()) {
//               case 'hour': // Adjusted based on time granularity
//                 if (index % 2 === 0) { // Every hour
//                   return value;
//                 } else {
//                   return '';
//                 }
//               case 'minute':
//                 if (index % 5 === 0) { // Every 5 minutes
//                   return value;
//                 } else {
//                   return '';
//                 }
//               case 'second':
//                 if (index % 10 === 0) { // Every 10 seconds
//                   return value;
//                 } else {
//                   return '';
//                 }
//               default:
//                 return '';
//             }
//           }
//         }
//       },
//       y: {
//         yAxisA: {
//           type: 'linear',
//           position: 'left',
//           title: {
//             display: true,
//             text: 'Y Axis A',
//           },
//         },
//         yAxisB: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis B',
//           },
//         },
//         yAxisC: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis C',
//           },
//         },
//         yAxisD: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis D',
//           },
//         },
//         yAxisE: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: true,
//             text: 'Y Axis E',
//           },
//         },
//         yAxisF: {
//           type: 'linear',
//           position: 'right',
//           title: {
//             display: false,
//             text: 'Y Axis F',
//           },
//         },
//       },
//     },
//   } as ChartOptions;
//   chartInstance: Chart;

//   constructor(private dataTableService: DataTableServiceService) {
//     this.startTime = new Date('2024-06-23T23:34:01.150500431Z');
//     this.endTime = new Date(this.startTime.getTime() + 24 * 60 * 60 * 1000);
//   }

//   ngOnInit() {
//     this.startTimeInput = new FormControl('', Validators.required);
//     console.log(this.startTime, 'Received type:', typeof this.startTime)
//     this.updateChartData();
//   }

//   onFormSubmit() {
//     // if (this.startTimeInput.valid) {
//      // const selectedTimeStr = this.startTimeInput.value;
//       const selectedTimeStr = '2024-06-23T23:34:01.150500431Z';
//       console.log(selectedTimeStr)
      
//       // const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

//       // if (!iso8601Regex.test(selectedTimeStr)) {
//       //   alert('Please enter a valid start time in YYYY-MM-DDTHH:mm:ss.sssZ format.');
//       //   return;
//       // }
      
//       // const timezoneOffset = selectedTimeStr.getTimezoneOffset() * 60000; // Get timezone offset in milliseconds
//       // const adjustedStartTime = new Date(selectedTimeStr.getTime() - timezoneOffset); // Adjust for local timezone
      
//       //this.startTime = adjustedStartTime
//      // this.startTime = '2024-06-23T23:34:01.150500431Z'
//       this.selectedTimeGranularity = +this.selectedTimeGranularity; // Ensure selectedTimeGranularity is treated as a number
//       this.endTime = new Date('2024-06-23T23:34:01.150500431Z' + this.selectedTimeGranularity);
      
//       console.log('Form submitted with startTime:', this.startTime, 'endTime:', this.endTime); // Debug log
//       this.updateChartData();
//     // } else {
//     //   alert('Please enter a valid start time in YYYY-MM-DDTHH:mm:ss.sssZ format.');
//     // }
//   }
  
//   onTimeGranularityChange() {
//     this.endTime = new Date(this.startTime.getTime() + this.selectedTimeGranularity);
//     this.updateChartData();
//   }

//   updateChartData() {
//     this.fetchChartData(this.startTime);
//     if (this.chartInstance) {
//       this.chartInstance.update(); // Update chart instance after updating datasets
//     }
//     console.log("Chart Updated")
//   }

//   fetchChartData(startTime: Date) {
    
//     const tagNames = ['Annulus Temperature', 'Annulus Pressure', 'Supply Voltage', 'Supply Current', 'Status'];

//     const requests = tagNames.map(tagName => this.dataTableService.getData(tagName, this.startTime.toISOString(), this.endTime.toISOString()));

//     forkJoin(requests).subscribe(results => {
//       this.data.datasets = results.map((result, index) => {
//         const rawData = result.deviceTagData.map((entry: any) => ({
//           x: new Date(entry.timestamps.serverTimestamp), // Use serverTimestamp here
//           y: entry.value.doubleValue || entry.value.stringValue
          
//         }));

//         const sampledData = this.downsample(rawData, 40); // Adjust downsampling as needed
//         console.log('fetchxValue:', sampledData, 'type:', typeof sampledData); 
//         return {
//           label: tagNames[index],
//           data: sampledData,
//           borderColor: this.getColor(index),
//           borderWidth: 2,
//           fill: false,
//           yAxisID: this.getYAxisID(tagNames[index]), // Ensure correct yAxisID
//         };
//       });
     
  
//       if (this.chartInstance) {
//         this.chartInstance.update(); // Update chart instance after updating datasets
//       }
//       this.loading = false; // Set loading to false once data is fetched
//     }, error => {
//       console.error('Failed to fetch chart data', error);
//       this.loading = false;
//     });
//   }

//   downsample(data: any[], maxPoints: number): any[] {
//     if (data.length <= maxPoints) {
//       return data;
//     }

//     const sampled = [];
//     const interval = Math.ceil(data.length / maxPoints);

//     for (let i = 0; i < data.length; i += interval) {
//       sampled.push(data[i]);
//     }

//     return sampled;
//   }

//   getColor(index: number): string {
//     // Return color based on index
//     const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
//     return colors[index % colors.length];
//   }

//   getYAxisID(tagName: string): string {
//     // Return yAxisID based on tag name
//     switch (tagName) {
//       case 'Annulus Temperature':
//         return 'yAxisA';
//       case 'Annulus Pressure':
//         return 'yAxisB';
//       case 'Supply Voltage':
//         return 'yAxisC';
//       case 'Supply Current':
//         return 'yAxisD';
//       case 'Status':
//         return 'yAxisE';
//       default:
//         return 'None';
//     }
//   }

//   getChartTimeUnit(): 'second' | 'minute' | 'hour' {
//     switch (this.selectedTimeGranularity) {
//       case 259200000: // 3 Days
//       case 86400000: // 1 Day
//         return 'hour';
//       case 3600000: // 1 Hour
//         return 'minute';
//       case 60000: // 1 Minute
//         return 'second';
//       default:
//         return 'hour'; // Default to hour if no match (shouldn't happen with provided options)
//     }
//   }
// }
import { Component, OnInit,NgZone } from '@angular/core';
import { Chart, ChartData, ChartOptions, Ticks } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { DataTableServiceService } from '../data-table-service.service';
import { FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import zoomPlugin from 'chartjs-plugin-zoom';
import { update } from 'lodash';
Chart.register(zoomPlugin);

@Component({
  selector: 'app-explore-data',
  templateUrl: './explore-data.component.html',
  styleUrls: ['./explore-data.component.css'],
})
export class ExploreDataComponent implements OnInit {
  public title = 'Line Chart Example';
  tagNames = ['Annulus Temperature', 'Annulus Pressure', 'Supply Voltage', 'Supply Current', 'Status'];
  startTime: Date = new Date('2024-06-23T23:34:01.150500431Z'); // Initialize startTime here
  endTime: string="";
  loading: boolean = true;
  selectedTimeGranularity: number = 86400000; // Default to 1 Day in milliseconds
  data: ChartData<'line', any, string> = {
    labels: [], // No longer setting x-axis labels
    datasets: []
  };
 
  constructor(private dataTableService: DataTableServiceService, private ngZone: NgZone) {}
  options: ChartOptions = {
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x', // Can be 'x', 'y', or 'xy'
        },
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          generateLabels: (chart: any) => {
            const { data } = chart;
            return data.datasets.map((dataset: any, i: number) => ({
              text: dataset.label || '',
              fillStyle: dataset.borderColor as string,
              strokeStyle: dataset.borderColor as string,
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
        text: 'Line Chart Example',
        position: 'top',
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            const datasetLabel = tooltipItem.dataset.label || '';
            const xValue = tooltipItem.raw.x instanceof Date ? tooltipItem.raw.x.toISOString() : tooltipItem.raw.x;
            const yValue = tooltipItem.raw.y;
            return `${datasetLabel}: (Time: ${xValue}, Value: ${yValue})`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
          min: this.startTime.toISOString(),
          max: this.endTime,
          unit: 'second', 
          displayFormats: {
            second: 'yyyy-MM-dd HH:mm:ss',
          },
          
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit:15 
        },

      },
      
      y: {
        yAxisA: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            
            text: 'Y Axis A',
          },
        },
        yAxisB: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Y Axis B',
          },
        },
        yAxisC: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Y Axis C',
          },
        },
        yAxisD: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Y Axis D',
          },
        },
        yAxisE: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Y Axis E',
          },
        },
        yAxisF: {
          type: 'linear',
          position: 'right',
          title: {
            display: false,
            text: 'Y Axis F',
          },
        },
      },
    },
  } as ChartOptions;
  chartInstance: any;
 
 
  ngOnInit() {
    this. selectedTimeGranularity = Number(this.selectedTimeGranularity)
    this.endTime = new Date(this.startTime.getTime() + this.selectedTimeGranularity).toISOString();
    this.updateChartData();
  }

  onTimeGranularityChange() {
    this. selectedTimeGranularity = Number(this.selectedTimeGranularity)
    console.log(this.selectedTimeGranularity,typeof this.selectedTimeGranularity )
    this.endTime = new Date(this.startTime.getTime() + this.selectedTimeGranularity).toISOString();
    this.updateChartData();
  }

  updateChartData() {
    this.data.datasets = []; // Clear datasets before updating
    this.fetchChartData(this.startTime);
    console.log("updated")
    
   
  }

  fetchChartData(startTime: Date) {
    const requests = this.tagNames.map(tagName => this.dataTableService.getData(tagName, startTime.toISOString(), this.endTime));

    forkJoin(requests).subscribe(results => {
      this.ngZone.run(() => {
        this.data.datasets = results.map((result, index) => {
          const rawData = result.deviceTagData.map((entry: any) => ({
            x: new Date(entry.timestamps.serverTimestamp), // Use serverTimestamp here
            y: entry.value.doubleValue || entry.value.stringValue
          }));

          const sampledData = this.downsample(rawData, 40); // Adjust downsampling as needed

          return {
            label: this.tagNames[index],
            data: sampledData,
            borderColor: this.getColor(index),
            borderWidth: 2,
            fill: false,
            yAxisID: this.getYAxisID(this.tagNames[index]), // Ensure correct yAxisID
          };
        });

        // Update y-axis configurations with colors
        const yAxesConfig = Array.from(new Set(this.tagNames.map(tagName => this.getYAxisID(tagName)))).map((yAxisID, index) => ({
          id: yAxisID,
          position: yAxisID === 'yAxisA' ? 'left' : 'right', // Adjust position as needed
          grid: {
            color: this.getColor(index) // Set grid line color
          },
          ticks: {
            color: this.getColor(index) // Set tick color
          },
          title: {
            display: true,
            text: yAxisID, // Set axis title
            color: this.getColor(index) // Set title color
          }
        }));

        // Update options with new y-axis configurations
        this.chartInstance.options.scales.y = yAxesConfig;

        if (this.chartInstance) {
          setTimeout(() => {
            this.chartInstance.update();
          }, 0); // Use a slight delay if necessary
        }

        this.loading = false; // Set loading to false once data is fetched
      });
    }, error => {
      console.error('Failed to fetch chart data', error);
      this.loading = false;
    });
  }
  

  downsample(data: any[], maxPoints: number): any[] {
    if (data.length <= maxPoints) {
      return data;
    }

    const sampled = [];
    const interval = Math.ceil(data.length / maxPoints);

    for (let i = 0; i < data.length; i += interval) {
      sampled.push(data[i]);
     
    }
    console.log("The sampled data is"+sampled)
    return sampled;
  }

  getColor(index: number): string {
    // Return color based on index
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[index % colors.length];
  }

  getYAxisID(tagName: string): string {
    // Return yAxisID based on tag name
    switch (tagName) {
      case 'Annulus Temperature':
        return 'yAxisA';
      case 'Annulus Pressure':
        return 'yAxisB';
      case 'Supply Voltage':
        return 'yAxisC';
      case 'Supply Current':
        return 'yAxisD';
      case 'Status':
        return 'yAxisE';
      default:
        return 'None';
    }
  }

}
