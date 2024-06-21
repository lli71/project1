import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApiService, MyData } from '../api.service';  // 确保正确的路径

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {
  dataSource: MatTableDataSource<MyData>; // 使用接口中的类型
  displayedColumns: string[] = ['checkbox', 'position', 'name', 'status', 'progress', 'unit', 'update'];
  compact = false;
  isSearchVisible = true;
  searchControl: FormControl = new FormControl('');
  mode = 'determinate';
  type = 'primary';
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  length = 0; // Initialize with 0
  isCheckbox2Checked: boolean = false;
  // Pagination properties
  currentPage = 0;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private apiService: ApiService) { // 注入 ApiService
    this.dataSource = new MatTableDataSource<MyData>([]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData();
  }

  loadData(): void {
    this.apiService.getDeviceData().subscribe(data => {
      // Assuming data is an array of MyData objects
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const dataSlice = data.slice(startIndex, endIndex);

      this.dataSource.data = dataSlice;
      this.length = data.length;

      // Ensure paginator is initialized before using it
      if (this.dataSource.paginator) {
        // Set initial page size and reset to first page
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
  onCheckboxChange(event: any, row: any): void {
    row.checked = event.checked;
    // row.check==true
    // // 检查是否至少有一个复选框被选中
    // this.isCheckbox2Checked = this.dataSource.data.some(dataRow => row.check==true);

    console.log(row);
    console.log('Checkbox 2 status:', this.isCheckbox2Checked);
  }
}

