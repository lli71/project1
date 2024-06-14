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
  isUpdated: boolean;
  progressValue: string;
  range: string;
  unit: string;
}

const ELEMENT_DATA: MyData[] = [
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




@Component({
  selector: 'app-hydraulic-actuator',
  templateUrl: './hydraulic-actuator.component.html',
  styleUrls: ['./hydraulic-actuator.component.css']
})
export class HydraulicActuatorComponent implements OnInit {
  dataSource = new MatTableDataSource<MyData>(ELEMENT_DATA);
  displayedColumns: string[] = ['select', 'position', 'name', 'status', 'progress', 'range', 'unit','update'];
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
 {

 }
}

