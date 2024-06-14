import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ProgressIndicatorMode, ProgressIndicatorType } from '@slb-dls/angular-material/progress-indicator';
import { SelectionModel } from '@angular/cdk/collections';

export interface MyData {
  equipment: string;
  equipmentID: string;
  position: number;
  name: string;
  status: boolean;
  progressValue: string;
  range: number;
  unit: string;
  isUpdated:boolean
}

const ELEMENT_DATA: MyData[] = [
  { equipment:'Modum Gas',equipmentID:'1',position: 1, name: 'Valve Position', status: true, progressValue: '70', range:  100, unit: '%',isUpdated:true },
  { equipment:'Modum Gas',equipmentID:'1',position: 2, name: 'Inlet Pressure', status: true, progressValue: '70', range: 200, unit: 'PSI',isUpdated:false  },
  { equipment:'Modum Gas',equipmentID:'1',position: 3, name: 'Outlet Pressure', status: false, progressValue: '50', range: 200, unit: 'PSI' ,isUpdated:false},
  { equipment:'Modum Gas',equipmentID:'1',position: 4, name: 'Inlet Temperature', status: true, progressValue: '70', range: 50, unit: '°C' ,isUpdated:false},
  { equipment:'Modum Gas',equipmentID:'1',position: 5, name: 'Gas Flowrate', status: true, progressValue: '80', range: 50, unit: 'kg/hr' ,isUpdated:false},
  { equipment:'Modum Gas',equipmentID:'1',position: 6, name: 'Flowrate Setpoint', status: true, progressValue: '80', range: 10, unit: 'kg/hr',isUpdated:false },
  { equipment:'Modum Gas',equipmentID:'1',position: 7, name: 'Valve Position', status: true, progressValue: '70', range: 100, unit: '%',isUpdated:false },
  { equipment:'Modum Gas',equipmentID:'1',position: 8, name: 'sample data', status: true, progressValue: '20', range: 100, unit: '%',isUpdated:false },
  { equipment:'Modum Gas',equipmentID:'1',position: 9, name: 'sample data', status: true, progressValue: '20', range: 100, unit: '%' ,isUpdated:false},
  { equipment:'Modum Gas',equipmentID:'1',position: 10, name: 'sample data', status: true, progressValue: '20', range: 100, unit: '%',isUpdated:false },
  { equipment:'Modum Gas',equipmentID:'1',position: 11, name: 'sample data', status: true, progressValue: '20', range: 100, unit: '%' ,isUpdated:false},
  { equipment:'Modum Gas',equipmentID:'1',position: 12, name: 'sample data', status: true, progressValue: '20', range: 100, unit: '%' ,isUpdated:false},
];

@Component({
  selector: 'app-modum-gas',
  templateUrl: './modum-gas.component.html',
  styleUrls: ['./modum-gas.component.css']
})
export class ModumGasComponent implements OnInit {
  dataSource = new MatTableDataSource<MyData>(ELEMENT_DATA);
  displayedColumns: string[] = ['select', 'position', 'name', 'status', 'progress', 'range', 'unit', 'update'];
  searchControl = new FormControl();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  currentPage = 0;
  length = ELEMENT_DATA.length;
  compact = false;
  isSearchVisible = true;
  showLabel = true;
  showPageCounter = true;
  showFirstLastButtons = true;
  showPageSize = true;
  isDisabled = false;
  progressIndicatorMode = ProgressIndicatorMode;
  progressIndicatorType = ProgressIndicatorType;
  selection = new SelectionModel<MyData>(true, []);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });
    this.updateTableData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateTableData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const selectedData = this.selection.selected;
    const unselectedData = ELEMENT_DATA.filter(item => !this.selection.selected.includes(item));
    const newData = [...selectedData, ...unselectedData];
    this.dataSource.data = newData.slice(startIndex, endIndex);
    this.length = newData.length;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateTableData();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    this.updateTableData();
  }

  toggleSelection(row: MyData) {
    this.selection.toggle(row);
    this.updateTableData();
  }
  updateData()
  {}
}
