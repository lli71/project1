// import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { FormControl } from '@angular/forms';
// import { ProgressIndicatorMode, ProgressIndicatorType } from '@slb-dls/angular-material/progress-indicator';
// import { SelectionModel } from '@angular/cdk/collections';
// import { ApiService, MyData } from '../api.service';  // 修改路径

// @Component({
//   selector: 'app-ptms',
//   templateUrl: './ptms.component.html',
//   styleUrls: ['./ptms.component.css']
// })
// export class PtmsComponent implements OnInit, OnDestroy {
//   dataSource: MatTableDataSource<MyData>; // 使用接口中的类型
//   displayedColumns: string[] = ['select', 'position', 'name', 'status', 'progress', 'unit', 'update'];
//   compact = false;
//   isSearchVisible = true;
//   searchControl: FormControl = new FormControl('');
//   mode = 'determinate';
//   type = 'primary';
//   pageSizeOptions: number[] = [5, 10, 25, 100];
//   pageSize = 5;
//   length = 0; // Initialize with 0
//   isCheckbox2Checked: boolean = false;
//   // Pagination properties
//   currentPage = 0;
//   refreshInterval: any;

//   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

//   constructor(private apiService: ApiService) { // 注入 ApiService
//     this.dataSource = new MatTableDataSource<MyData>([]);
//   }

//   ngOnInit(): void {
//     this.dataSource.paginator = this.paginator;
//     this.loadData();
//     this.refreshInterval = setInterval(() => this.loadData(), 10000); // 每10秒刷新一次数据
//   }

//   ngOnDestroy(): void {
//     if (this.refreshInterval) {
//       clearInterval(this.refreshInterval);
//     }
//   }

//   loadData(): void {
//     this.apiService.getDeviceData().subscribe(data => {
//       // Assuming data is an array of MyData objects
//       const startIndex = this.currentPage * this.pageSize;
//       const endIndex = startIndex + this.pageSize;
//       const dataSlice = data.slice(startIndex, endIndex);

//       this.dataSource.data = dataSlice;
//       this.length = data.length;

//       // Ensure paginator is initialized before using it
//       if (this.dataSource.paginator) {
//         // Set initial page size and reset to first page
//         this.dataSource.paginator.pageSize = this.pageSize;
//         this.dataSource.paginator.firstPage();
//       }
//     });
//   }

//   onPageChange(event: PageEvent): void {
//     this.currentPage = event.pageIndex;
//     this.pageSize = event.pageSize;
//     this.loadData();
//   }

//   onCheckboxChange(event: any, row: any): void {
//     row.checked = event.checked;
//     row.check=true;
//     console.log(row);
//     console.log('Checkbox 2 status:', row.check);
//   }
// }
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ApiService, MyData } from '../api.service';

@Component({
  selector: 'app-ptms',
  templateUrl: './ptms.component.html',
  styleUrls: ['./ptms.component.css']
})
export class PtmsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<MyData>;
  displayedColumns: string[] = ['select', 'position', 'name', 'status', 'progress', 'unit', 'update'];
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
    this.apiService.getDeviceData().subscribe(data => {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const dataSlice = data.slice(startIndex, endIndex);
  
      const newData = dataSlice.map(item => {
        const isSelected = this.selectedRows.some(selected => selected.name === item.name && selected.equipmentID === item.equipmentID);
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
      if (!this.selectedRows.some(selected => selected.name === row.name && selected.equipmentID === row.equipmentID)) {
        this.selectedRows.push(row);
      }
    } else {
      this.selectedRows = this.selectedRows.filter(selected => !(selected.name === row.name && selected.equipmentID === row.equipmentID));
    }

    console.log('Selected rows:', this.selectedRows);
  }
}
