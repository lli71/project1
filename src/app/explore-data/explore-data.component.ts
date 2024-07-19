//pagination 可能没有初始化
import { MatTableDataSource } from '@angular/material/table';
import { ColDef, GridApi, GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { Component, OnInit,NgZone } from '@angular/core';
import { Chart, ChartData, ChartOptions, Ticks } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { DataTableServiceService } from '../data-table-service.service';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, finalize, forkJoin } from 'rxjs';
import zoomPlugin from 'chartjs-plugin-zoom';
import { update } from 'lodash';

Chart.register(zoomPlugin);

@Component({
  selector: 'app-explore-data',
  templateUrl: './explore-data.component.html',
  styleUrls: ['./explore-data.component.css'],
})
export class ExploreDataComponent implements OnInit {
  public tableData: any[] = [];
  public displayedColumns = ['deviceName', 'tagname', 'value', 'unit'];
  public compact = false;
  public rowData: any[] = [];
  // public selectedData: any[] = [
  //   { deviceName:'PTMS',tagName: 'Annulus Temperature', deviceId: '168b812aed404678bc888a873209f90f',  value: '70', storageUnit: '%' },
  //   { deviceName:'PTMS',tagName: 'Annulus Pressure', deviceId: '168b812aed404678bc888a873209f90f', value: '70', storageUnit: 'PSI' },
  //   { deviceName:'PTMS',tagName: 'Supply Voltage', deviceId: '168b812aed404678bc888a873209f90f',  value: 'Yes', storageUnit: '' },
  //   { deviceName:'Flowmeter',tagName: 'Temperature', deviceId: '6593430baec64babbdc29c7a5f1b24fc',  value: 'Yes', storageUnit: '' },
  //   ];
    public selectedData: any[] = [];
  //three lines for mat-card update
  private selectedDataSubject = new BehaviorSubject<any[]>([]);
  selectedData$ = this.selectedDataSubject.asObservable();
  dataSource = new MatTableDataSource<any>(this.selectedData);

  // public rowData: any[] = [
  // { tagName: 'Annulus Temperature', deviceId: '168b812aed404678bc888a873209f90f', position: 1, name: 'Annulus Pressure', status: true, progressValue: '70', unit: '%' },
  // { tagName: 'Annulus Pressure', deviceId: '168b812aed404678bc888a873209f90f', position: 2, name: 'Supply Voltage', status: true, progressValue: '70', unit: 'PSI' },
  // { tagName: 'Supply Voltage', deviceId: '168b812aed404678bc888a873209f90f', position: 3, name: 'Supply Current', status: false, progressValue: 'Yes', unit: '' },
  // { tagName: 'Temperature', deviceId: '6593430baec64babbdc29c7a5f1b24fc', position: 3, name: 'Supply Current', status: false, progressValue: 'Yes', unit: '' },
  // ];
  // public selectedData: any[] = [
  // { tagName: 'Annulus Temperature', deviceId: '168b812aed404678bc888a873209f90f', position: 1, name: 'Annulus Pressure', status: true, progressValue: '70', unit: '%' },
  // { tagName: 'Annulus Pressure', deviceId: '168b812aed404678bc888a873209f90f', position: 2, name: 'Supply Voltage', status: true, progressValue: '70', unit: 'PSI' },
  // { tagName: 'Supply Voltage', deviceId: '168b812aed404678bc888a873209f90f', position: 3, name: 'Supply Current', status: false, progressValue: 'Yes', unit: '' },
  // { tagName: 'Temperature', deviceId: '6593430baec64babbdc29c7a5f1b24fc', position: 3, name: 'Supply Current', status: false, progressValue: 'Yes', unit: '' },
  // ];

  public columnDefs: ColDef[] = [
    { field: 'deviceName', checkboxSelection: true },
    { field: 'tagName' },
    { field: 'value' }, // Update this to 'storageUnit'
    { field: 'storageUnit' } // Add a new column for 'storageUnit'
  ];

  public defaultColDef: ColDef = {
    filter: 'agTextColumnFilter',
    floatingFilter: true,
  };

  //public dataSource = new MatTableDataSource<any>(this.tableData);
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [99,50,20, 10, 5];
  public themeClass: string = 'ag-theme-quartz';
  public selectedTime : string;
  private gridApi!: GridApi;
  public errorMessage : string;
  public selectedColumnDefs: ColDef[] = [];
  public title = 'Cross Device Data Visulisation';
  //tagNames = ['Annulus Temperature', 'Annulus Pressure', 'Supply Voltage', 'Supply Current', 'Status'];
  startTime: Date = new Date('2024-06-23T23:34:01.000Z'); // Initialize startTime here
  endTime: string="";
  loading: boolean = false;
  selectedTimeGranularity: number = 86400000; // Default to 1 Day in milliseconds
  data: ChartData<'line', any, string> = {
    labels: [], // No longer setting x-axis labels
    datasets: []
  };
  deviceIds: string[] = [
    '168b812aed404678bc888a873209f90f',
    '6593430baec64babbdc29c7a5f1b24fc',
    '5a751a0234d04511a307aa6b4b1f0848',
    '0964976ce2a84ff78c6cb18fc881fd70',
    'bca428fb5428449ca75c7b6dc482a5a4',
    '9e863d9eeb5f4dc1b67093f23f97c800',
    'a35a20a3f7304f90a33371302aea448c',
    'd5aec4b0e39640beb4c1167e5b409a18',
    'a53a4206d5294bf7b205311dcbcac9b5'
    // Add more deviceIds as needed
  ];
  constructor(private dataTableService: DataTableServiceService, private ngZone: NgZone) {
  console.log(this.rowData)  
  console.log(this.selectedData)
  }
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
        text: this.title,
        position: 'top',
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            const datasetLabel = tooltipItem.dataset.label || '';
            const deviceName = tooltipItem.raw.deviceName || ''; // Assuming deviceName is added to tooltipItem.raw
            // const xValue = tooltipItem.raw.x instanceof Date ? tooltipItem.raw.x.toISOString() : tooltipItem.raw.x;
            const yValue = tooltipItem.raw.y.toFixed(2);
            //const storageUnit=tooltipItem.raw.storageUnit;
            return `${datasetLabel}: (Device:${deviceName} Value: ${yValue} )`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        //min: this.startTime.toISOString(),
       
        time: {
          tooltipFormat: 'yyyy-MM-dd HH:mm:ss',
          min: this.startTime.toISOString(),
          // max: this.endTime,
          unit: 'minute', 
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
          title: {
            display: true,
            color: this.getColor(0), // Reference getColor method for color
            text: '1',
          },
          type: 'linear',
          position: 'left',
          // title: {
          //   display: true,
          //   color: this.getColor(0), // Reference getColor method for color
          //   text: '1',
          // },
          ticks: {
            color: this.getColor(0),
          },
          grid: {
            color: this.getColor(0),
          },
        },
        yAxisB: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: '2',
          },
        },
        yAxisC: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: '3',
          },
        },
        yAxisD: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: '4',
          },
        },
        yAxisE: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: '5',
          },
        },
        // yAxisF: {
        //   display: false,
        //   type: 'linear',
        //   position: 'left',
        //   title: {
        //     display: true,
        //     text: '6',
        //   },
        // },
      },
    },
  } as ChartOptions;
  chartInstance: any;
 
 
  ngOnInit() {
    //mat-card update
 // Initialize dataSource with initial selectedData
 this.selectedData$.subscribe(data => {
  this.dataSource.data = data;
});
// Update selectedDataSubject with initial data working!
this.selectedDataSubject.next(this.selectedData);

    this.dataTableService.getTableData(this.deviceIds)
    .pipe(
      finalize(() => {
        // Finalize logic if needed
      })
    )
    .subscribe(
      (responses: any[]) => {
        console.log('API Responses:', responses);
        // Handle responses array (each response now includes deviceName)
        responses.forEach(response => {
          // Iterate through each deviceTagData item
          if (response.deviceTagData && Array.isArray(response.deviceTagData)) {
            response.deviceTagData.forEach((item: { tagName: any; value: { doubleValue: any; };context: { deviceId: any; };  quality: any; timestamps: { sourceTimestamp: any; serverTimestamp: any; }; unitSystem: any; domain: { qualifier: any; namespace: any; }; storageUnit: any; deviceName: any; }) => {
              this.rowData.push({
                deviceName:item.deviceName,
                tagName: item.tagName,
                value: item.value && typeof item.value.doubleValue === 'number' ? parseFloat(item.value.doubleValue.toFixed(2)) : null,
                //quality: item.quality,
                //sourceTimestamp: item.timestamps && item.timestamps.sourceTimestamp ? item.timestamps.sourceTimestamp : null,
                //serverTimestamp: item.timestamps && item.timestamps.serverTimestamp ? item.timestamps.serverTimestamp : null,
                //unitSystem: item.unitSystem,
                //qualifier: item.domain && item.domain.qualifier ? item.domain.qualifier : null,
                //namespace: item.domain.namespace,
                storageUnit: item.storageUnit,
                deviceId:item.context.deviceId
              });
            });
          }
        });
        console.log('Row Data:', this.rowData); // Check the rowData after populating
      },
      (error) => {
        console.error('API Error:', error);
        // Handle errors
      }
    );
    this. selectedTimeGranularity = Number(this.selectedTimeGranularity)
    this.endTime = new Date(this.startTime.getTime() + this.selectedTimeGranularity).toISOString();
    //this.updateChartData();
    
  }

  onTimeGranularityChange() {
    this. selectedTimeGranularity = Number(this.selectedTimeGranularity)
    console.log(this.selectedTimeGranularity,typeof this.selectedTimeGranularity )
    this.endTime = new Date(this.startTime.getTime() + this.selectedTimeGranularity).toISOString();
    console.log("The start Time is"+this.startTime.toISOString())
    console.log("The end Time is"+this.endTime)
    //this.updateChartData();
  }

  updateChartData() {
    this.loading=true;
    this.data.datasets = []; // Clear datasets before updating
    this.fetchChartData(this.startTime);
    console.log("updated")
    this.loading=false;
   
  }
  fetchChartData(startTime: Date) {
    console.log("when Fetching The length is "+this.selectedData.length+"The selected data is " + JSON.stringify(this.selectedData, null, 2));
    const requests = this.selectedData.map(item => {
      
      return this.dataTableService.getData(item.deviceName,item.deviceId,item.tagName, startTime.toISOString(), this.endTime);
    });
  
    forkJoin(requests).subscribe(
      results => {
        this.ngZone.run(() => {
          this.data.datasets = results.map((result, index) => {
            const rawData = result.deviceTagData.map((entry: any) => ({
              x: new Date(entry.timestamps.serverTimestamp),
              y: entry.value.doubleValue || entry.value.stringValue,
              deviceName: entry.deviceName,
              //storageUnit:entry.storageUnit
            }));
  
            const sampledData = this.downsample(rawData, 60);
  
            return {
              label: this.selectedData[index].tagName, // Use tagName from rowData
              data: sampledData,
              borderColor: this.getColor(index),
              pointBackgroundColor:this.getColor(index),
              borderWidth: 2,
              fill: false,
              yAxisID: this.getYAxisID(index),
             
            };
          });
  
          // const yAxes = this.selectedData.map((item, index) => {
          //   const color = this.getColor(index);
          //   return {
          //     id: this.getYAxisID(index),
          //     type: 'linear',
          //     position: index % 2 === 0 ? 'left' : 'right',
          //     title: {
          //       display: true,
          //       color: color,
          //       text: `Y-Axis ${index + 1}`,
          //     },
          //     ticks: {
          //       color: color // y轴标签的颜色
          //     },
          //     grid: {
          //       color: color // y轴网格线的颜色
          //     },
          //   };
          // });

          if (this.chartInstance) {
            setTimeout(() => {
              this.chartInstance.update();
            }, 0); // Use a slight delay if necessary
          }
  
          this.loading = false; // Set loading to false once data is fetched
        });
      },
      error => {
        console.error('Failed to fetch chart data', error);
        this.errorMessage="Failed to fetch chart data, you can try another time range."
        this.loading = false;
      }
    );
  }
  
  // fetchChartData(startTime: Date) {
    
  //   const requests = this.tagNames.map(tagName => this.dataTableService.getData(tagName, startTime.toISOString(), this.endTime));

  //   forkJoin(requests).subscribe(results => {
  //     this.ngZone.run(() => {
  //       this.data.datasets = results.map((result, index) => {
  //         const rawData = result.deviceTagData.map((entry: any) => ({
  //           x: new Date(entry.timestamps.serverTimestamp), // Use serverTimestamp here
  //           y: entry.value.doubleValue || entry.value.stringValue
  //         }));

  //         const sampledData = this.downsample(rawData, 40); // Adjust downsampling as needed

  //         return {
  //           label: this.tagNames[index],
  //           data: sampledData,
  //           borderColor: this.getColor(index),
  //           borderWidth: 2,
  //           fill: false,
  //           yAxisID: this.getYAxisID(this.tagNames[index]), // Ensure correct yAxisID
  //         };
  //       });

  //       if (this.chartInstance) {
  //         setTimeout(() => {
  //           this.chartInstance.update();
  //         }, 0); // Use a slight delay if necessary
  //       }

  //       this.loading = false; // Set loading to false once data is fetched
  //     });
  //   }, error => {
  //     console.error('Failed to fetch chart data', error);
  //     this.loading = false;
  //   });
  // }

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
    const colors = ['#309840', '#0997C8', '#8152CA', '#E68C01', '#C71F76'];
    return colors[index % colors.length];
  }

  getYAxisID(index: number): string {
    // Return yAxisID based on the index
    switch (index) {
      case 0:
        return 'yAxisA';
      case 1:
        return 'yAxisB';
      case 2:
        return 'yAxisC';
      case 3:
        return 'yAxisD';
      case 4:
        return 'yAxisE';
      default:
        return 'None';
    }
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  updateSelectedTable() {
    this.selectedColumnDefs = this.columnDefs.map((colDef) => ({ ...colDef, checkboxSelection: false }));
    this.selectedData = this.selectedData.map((data) => ({ ...data, checkboxSelection: false }));
  }

  // onRowSelected(event: RowSelectedEvent) {
  //   const selectedRow = event.node.data;
  //   if (event.node.isSelected()) {
  //     this.dataSource.data.push(selectedRow);
  //     this.dataSource._updateChangeSubscription();
  //   } else {
  //     this.dataSource.data = this.dataSource.data.filter((row) => row !== selectedRow);
  //   }
  //   console.log("The selected data is "+this.selectedData)
  // }

  //right output for plain table output
  // onRowSelected(event: RowSelectedEvent) {
  //   const selectedRow = event.node.data;
  //   if (event.node.isSelected()) {
  //     this.selectedData.push(selectedRow);
  //   } else {
  //     this.selectedData = this.selectedData.filter((row) => row !== selectedRow);
  //   }
  //   console.log("The length is "+this.selectedData.length+"The selected data is " + JSON.stringify(this.selectedData, null, 2));
  // }
  //realize the function in mat card 
  // onRowSelected(event: RowSelectedEvent): void {
  //   const selectedRow = event.node.data;
  //   if (event.node.isSelected()) {
  //     this.selectedData.push(selectedRow);
  //   } else {
  //     this.selectedData = this.selectedData.filter((row) => row !== selectedRow);
  //   }
  //   // Update the BehaviorSubject with the new selectedData
  //   this.selectedDataSubject.next(this.selectedData);
  //   console.log('The selected data is ', this.selectedData);
  //   this.updateChartData();
  // }
  onRowSelected(event: RowSelectedEvent): void {
    const selectedRow = event.node.data;
    const maxSelections = 5; // Maximum number of selections allowed
  
    if (event.node.isSelected()) {
      // Check if maximum selections reached
      if (this.selectedData.length < maxSelections) {
        this.selectedData.push(selectedRow);
      } else {
        // Optionally, you can notify the user or handle this case differently
        alert('Maximum selections 5 reached.');
        event.node.setSelected(false); // Deselect the checkbox
      }
    } else {
      this.selectedData = this.selectedData.filter((row) => row !== selectedRow);
    }
  
    // Update the BehaviorSubject with the new selectedData
    this.selectedDataSubject.next(this.selectedData);
    console.log('The selected data is ', this.selectedData);
    //this.updateChartData();
  }
 getStartTime():Date {
  this.loading=true;
  const dateTimeWithSeconds = this.selectedTime + ':00.000';
  console.log('Modified Input:', dateTimeWithSeconds);

  // Step 2: Create a Date object from the modified string
  const dateObj = new Date(dateTimeWithSeconds);
  console.log('Date Object:', dateObj);
  // Step 3: Convert date to UTC by subtracting the timezone offset (Singapore is UTC+8)
  // const utcDate = new Date(dateObj.getTime() - (8 * 60 * 60 * 1000));
  // console.log('UTC Date:', utcDate);

  // Step 4: Format the UTC date to ISO 8601 format with milliseconds
 // const formattedDate = utcDate.toISOString();
  //console.log('Formatted Date:', formattedDate);
  this.startTime=dateObj
  this.updateChartData()
  console.log(this.selectedTime)
 return this.startTime


 
}
    
    
  }

