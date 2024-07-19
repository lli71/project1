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
  selectedRows: MyData[] = [];
  displayedColumns: string[] = ['select', 'position', 'tagName', 'status', 'value', 'storageUnit'];
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
  public deviceId: string = "6593430baec64babbdc29c7a5f1b24fc";

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<MyData>([]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

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

      this.dataSource.data = newData;
      this.length = data.length;
      this.updateSelectedRows();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.pageSize = this.pageSize;
        this.dataSource.paginator.firstPage();
      }
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

  onDelete(index: number): void {
    if (index >= 0 && index < this.selectedRows.length) {
      this.selectedRows.splice(index, 1);
    }
  }

  updateSelectedRows(): void {
    this.selectedRows = this.selectedRows.map(selected => {
      const correspondingData = this.dataSource.data.find(data => data.tagName === selected.tagName && data.deviceId === selected.deviceId);
      return correspondingData ? { ...selected, ...correspondingData } : selected;
    });
  }
}

