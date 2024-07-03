
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { FormControl } from '@angular/forms';
// import { ProgressIndicatorMode, ProgressIndicatorType } from '@slb-dls/angular-material/progress-indicator';
// import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ApiService, MyData } from '../api.service';

// export interface MyData {
//   equipment: string;
//   equipmentID: string;
//   position: number;
//   name: string;
//   status: boolean;
//   isUpdated: boolean;
//   progressValue: string;
//   range: string;
//   unit: string;
// }

// const ELEMENT_DATA: MyData[] = [
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 1, name: 'Valve Position', status: true, progressValue: '70', range: '0% - 100%', unit: '%', isUpdated: true },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 2, name: 'Housing Fluid Pressure', status: true, progressValue: '70', range: '0 - 1000', unit: 'PSI', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 3, name: 'Stem Leakage', status: false, progressValue: 'Yes', range: 'Yes or No', unit: '', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 4, name: 'Seat Leakage', status: false, progressValue: 'No', range: 'Yes or No', unit: '', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 5, name: 'Sample Data 1', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 6, name: 'Sample Data 2', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 7, name: 'Sample Data 3', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 8, name: 'Sample Data 4', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 9, name: 'Sample Data 5', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 10, name: 'Sample Data 6', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 11, name: 'Sample Data 7', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 12, name: 'Sample Data 8', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 13, name: 'Sample Data 9', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
//   { equipment: 'Electric Actuator', equipmentID: '4', position: 14, name: 'Sample Data 10', status: true, progressValue: '20', range: '0% - 100%', unit: '%', isUpdated: false },
// ];


@Component({
  selector: 'app-six-electric-actuator',
  templateUrl: './six-electric-actuator.component.html',
  styleUrls: ['./six-electric-actuator.component.css']
})
export class SixElectricActuatorComponent implements OnInit {
  dataSource: MatTableDataSource<MyData>;
  displayedColumns: string[] = ['select', 'position', 'tagName', 'status', 'value', 'storageUnit', 'update'];
  compact = false;
  isSearchVisible = true;
  searchControl: FormControl = new FormControl('');
  mode = 'determinate';
  type = 'primary';
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  length = 0;
  currentPage = 0;
  refreshInterval: any;
  selectedRows: MyData[] = [];
  public deviceId :string="bca428fb5428449ca75c7b6dc482a5a4"
 // Secondsource: MatTableDataSource<MyData>; // Declare Secondsource

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<MyData>([]);
   // this.Secondsource = new MatTableDataSource<MyData>([]); // Initialize Secondsource
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    //this.Secondsource.paginator = this.paginator;

    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });

    this.loadData();
    this.refreshInterval = setInterval(() => this.loadData(), 10000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadData(): void {
    this.apiService.getDeviceData(this.deviceId).subscribe(data => {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const dataSlice = data.slice(startIndex, endIndex);
  
      const newData = dataSlice.map(item => {
        const isSelected = this.selectedRows.some(selected => selected.tagName === item.tagName && selected.deviceId === item.deviceId);
        return { ...item, checked: isSelected };
      });
  
      // Update dataSource
      this.dataSource.data = newData;
      this.length = data.length;
  
      // Update Secondsource only if it hasn't been initialized yet
      // if (this.Secondsource.data.length === 0) {
      //   this.Secondsource.data = [...data]; // Assign data to Secondsource
      //   this.Secondsource.paginator = this.paginator; // Set paginator for Secondsource
      // }
  
      // Ensure both paginators are initialized and set to the same pageSize
      if (this.dataSource.paginator) {
        this.dataSource.paginator.pageSize = this.pageSize;
        this.dataSource.paginator.firstPage();
      }
  
      // if (this.Secondsource.paginator) {
      //   this.Secondsource.paginator.pageSize = this.pageSize;
      //   this.Secondsource.paginator.firstPage();
      // }
    });
  }
  
  

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCheckboxChange(event: any, row: MyData): void {
    row.checked = event.checked;

    if (event.checked) {
      if (!this.selectedRows.some(selected => selected.tagName === row.tagName && selected.deviceId === row.deviceId)) {
        this.selectedRows.push(row);
      }
    } else {
      this.selectedRows = this.selectedRows.filter(selected => !(selected.tagName === row.tagName && selected.deviceId === row.deviceId));
    }

    console.log('Selected rows:', this.selectedRows);
  }
  onDelete(index: number) {
    if (index >= 0 && index < this.selectedRows.length) {
      this.selectedRows.splice(index, 1); // Remove one element at 'index'
    }
  }
//   dataSource = new MatTableDataSource<MyData>(ELEMENT_DATA);
//   displayedColumns: string[] = ['select', 'position', 'name', 'status', 'progress', 'range', 'unit','update'];
//   searchControl = new FormControl();
//   pageSizeOptions: number[] = [5, 10, 25, 100];
//   pageSize = 5;
//   currentPage = 0;
//   length = ELEMENT_DATA.length;
//   compact = false;
//   isSearchVisible = true;
//   showLabel = true;
//   showPageCounter = true;
//   showFirstLastButtons = true;
//   showPageSize = true;
//   isDisabled = false;
//   progressIndicatorMode = ProgressIndicatorMode;
//   progressIndicatorType = ProgressIndicatorType;
//   selection = new SelectionModel<MyData>(true, []);

//   @ViewChild(MatSort) sort!: MatSort;
//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   ngOnInit() {
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;
//     this.searchControl.valueChanges.subscribe(value => {
//       this.applyFilter(value);
//     });
//     this.updateTableData();
//   }

//   applyFilter(filterValue: string) {
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }

//   updateTableData() {
//     const startIndex = this.currentPage * this.pageSize;
//     const endIndex = startIndex + this.pageSize;
//     const selectedData = this.selection.selected;
//     const unselectedData = ELEMENT_DATA.filter(item => !this.selection.selected.includes(item));
//     const newData = [...selectedData, ...unselectedData];
//     this.dataSource.data = newData.slice(startIndex, endIndex);
//     this.length = newData.length;
//   }

//   onPageChange(event: PageEvent) {
//     this.currentPage = event.pageIndex;
//     this.pageSize = event.pageSize;
//     this.updateTableData();
//   }

//   isAllSelected() {
//     const numSelected = this.selection.selected.length;
//     const numRows = this.dataSource.data.length;
//     return numSelected === numRows;
//   }

//   masterToggle() {
//     this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
//     this.updateTableData();
//   }

//   toggleSelection(row: MyData) {
//     this.selection.toggle(row);
//     this.updateTableData();
//   }
//  updateData()
//  {

//  }
}
