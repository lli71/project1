// import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
// import { FormControl } from '@angular/forms';
// import { ApiService, MyData } from '../api.service';

// @Component({
//   selector: 'app-automated-pressure-vent-valve',
//   templateUrl: './automated-pressure-vent-valve.component.html',
//   styleUrls: ['./automated-pressure-vent-valve.component.css']
// })
// export class AutomatedPressureVentValveComponent implements OnInit, OnDestroy, AfterViewInit {
//   dataSource: MatTableDataSource<MyData>;
//   displayedColumns: string[] = ['select', 'position', 'name', 'status', 'progress', 'unit', 'update'];
//   compact = false;
//   isSearchVisible = true;
//   searchControl: FormControl = new FormControl('');
//   mode = 'determinate';
//   type = 'primary';
//   pageSizeOptions: number[] = [5, 6, 7, 8];
//   pageSize = 5;
//   length = 0;
//   currentPage = 0;
//   selectedRows: MyData[] = [];

//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   constructor(private apiService: ApiService) {
//     this.dataSource = new MatTableDataSource<MyData>([]);
//   }

//   ngOnInit(): void {
//     // Subscribe to filter changes
//     this.searchControl.valueChanges.subscribe(value => {
//       this.applyFilter(value);
//     });

//     // Load data initially
//     this.loadData();
//   }

//   ngAfterViewInit(): void {
//     // Assign paginator only after view initialization
//     this.dataSource.paginator = this.paginator;
//   }

//   ngOnDestroy(): void {
//     // Clean up any subscriptions or intervals if needed
//   }

//   loadData(): void {
//     this.apiService.getDeviceData().subscribe(data => {
//       // Assign data to dataSource
//       this.dataSource.data = data;

//       // Update length for paginator
//       this.length = data.length;

//       // Ensure paginator settings are correct
//       if (this.paginator) {
//         this.paginator.pageSize = this.pageSize;
//         this.paginator.length = this.length;
//         this.paginator.firstPage();
//       }
//     });
//   }

//   onPageChange(event: PageEvent): void {
//     this.currentPage = event.pageIndex;
//     this.pageSize = event.pageSize;
//     console.log('Page changed:', event);
//     // Handle data slice for pagination if needed
//   }

//   applyFilter(filterValue: string): void {
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }

//   onCheckboxChange(event: any, row: MyData): void {
//     row.checked = event.checked;

//     if (event.checked) {
//       this.selectedRows.push(row);
//     } else {
//       this.selectedRows = this.selectedRows.filter(selected => selected !== row);
//     }

//     console.log('Selected rows:', this.selectedRows);
//   }
// }
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ApiService, MyData } from '../api.service';

@Component({
  selector: 'app-automated-pressure-vent-valve',
  templateUrl: './automated-pressure-vent-valve.component.html',
  styleUrls: ['./automated-pressure-vent-valve.component.css']
})
export class AutomatedPressureVentValveComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<MyData>;
  displayedColumns: string[] = ['select', 'position', 'name', 'status', 'progress', 'unit', 'update'];
  compact = false;
  isSearchVisible = true;
  searchControl: FormControl = new FormControl('');
  mode = 'determinate';
  type = 'primary';
  pageSizeOptions: number[] = [5, 6, 7, 8];
  pageSize = 5;
  length = 0;
  currentPage = 0;
  selectedRows: MyData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<MyData>([]);
  }

  ngOnInit(): void {
    // 加载数据
    this.loadData();
  }

  ngOnDestroy(): void {
    // 清理订阅和资源
  }

  loadData(): void {
    this.apiService.getDeviceData().subscribe(data => {
      // 只显示前5行数据
      const slicedData = data.slice(0, this.pageSize);

      // 加载数据到dataSource
      this.dataSource.data = slicedData;

      // 设置数据长度和分页器
      this.length = data.length;
      this.dataSource.paginator = this.paginator; // 设置分页器

      // 设置分页器的初始值
      this.paginator.pageSize = this.pageSize;
      this.paginator.length = this.length;
      this.paginator.firstPage();

      // 应用初始过滤
      const initialSearchValue = this.searchControl.value;
      this.applyFilter(initialSearchValue);
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log('Page changed:', event);

    // 处理数据切片或其他逻辑
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.dataSource.data.slice(startIndex, endIndex);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCheckboxChange(event: any, row: MyData): void {
    row.checked = event.checked;

    if (event.checked) {
      this.selectedRows.push(row);
    } else {
      this.selectedRows = this.selectedRows.filter(selected => selected !== row);
    }

    console.log('Selected rows:', this.selectedRows);
  }
}
