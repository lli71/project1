import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ApiService, MyData } from '../api.service';

@Component({
  selector: 'app-modum-gas',
  templateUrl: './modum-gas.component.html',
  styleUrls: ['./modum-gas.component.css']
})
export class ModumGasComponent implements OnInit {
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
  public deviceId :string="a53a4206d5294bf7b205311dcbcac9b5"
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
}
