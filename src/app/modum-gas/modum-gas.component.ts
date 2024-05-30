import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ProgressIndicatorMode, ProgressIndicatorType } from '@slb-dls/angular-material/progress-indicator';
export interface MyData {
  position: number;
  name: string;
  // status: { status: number };
  status: boolean
  progressValue: string;
  range:string;
  unit: string;
}

const ELEMENT_DATA: MyData[] = [
  { position: 1, name: 'Valve Position', status: true, progressValue: '70', range:'0% ~ 100', unit: '%' },
  { position: 2, name: 'Inlet Pressure', status: true, progressValue: '70', range:'0 ~ 200', unit: 'PSI' },
  { position: 3, name: 'Outlet Pressure', status: false, progressValue: '50', range:'0 ~ 200', unit: 'PSI' },
  { position: 4, name: 'Inlet Temperature', status: true, progressValue: '70', range:'0 ~ 50', unit: '°C' },
  { position: 5, name: 'Gas Flowrate', status: true, progressValue: '80', range:'0 ~ 50', unit: 'kg/hr' },
  { position: 6, name: 'Flowrate Setpoiny', status: true, progressValue: '80', range:'0 ~ 50', unit: 'kg/hr' },
  { position: 7, name: 'Valve Position', status: true, progressValue: '70', range:'0% ~ 100', unit: '%' },

  // Add more data as needed
];

@Component({
  selector: 'app-modum-gas',
  templateUrl: './modum-gas.component.html',
  styleUrls: ['./modum-gas.component.css']
})
export class ModumGasComponent implements OnInit {
  dataSource = new MatTableDataSource<MyData>(ELEMENT_DATA);
  displayedColumns: string[] = ['position', 'name', 'status', 'progress','range', 'unit'];
  searchControl = new FormControl();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 10;
  length = ELEMENT_DATA.length;
  compact = false;
  isSearchVisible = true;
  mode = 'determinate';
  type = 'linear';
  progressIndicatorMode = ProgressIndicatorMode;
  progressIndicatorType = ProgressIndicatorType;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
