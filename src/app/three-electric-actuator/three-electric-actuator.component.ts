import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { ApiService, MyData } from '../api.service';
import { SlbPopoverDirective } from '@slb-dls/angular-material/popover';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Router, RoutesRecognized } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-three-electric-actuator',
  templateUrl: './three-electric-actuator.component.html',
  styleUrls: ['./three-electric-actuator.component.css']
})
export class ThreeElectricActuatorComponent implements OnInit {
  form: FormGroup;
  dataSource: MatTableDataSource<MyData>;
  selectedRows: MyData[] = [];
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
  public deviceId: string = "bca428fb5428449ca75c7b6dc482a5a4";

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Input() slbPopoverTrigger: 'hover' | 'click';
  @Input() hideArrow: boolean = false;
  @Input() slbPopoverCloseOnClick = true;
  @Input() slbPopoverCloseOnEscape = true;
  @Input() slbPopoverDisabled = false;
  @Input() useTargetElement = false;//unkown property

  @Input() set slbPopoverBackdropClass(value: string) {
    value = (value || '').trim();
    // Ensure we assign an empty string if value is null or undefined
    if (this.backDropClass !== value) {
        this.backDropClass = value !== null ? value : '';
        this._recreatePopover();
    }
}
  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource<MyData>([]);
    this.form = this.fb.group({
      accessToken: ['', [Validators.required, this.accessTokenValidator]],
      value: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }
  get slbPopoverBackdropClass() {
    return this.backDropClass;
}


  @Input() set slbPopoverHasBackdrop(value: boolean) {
      value = coerceBooleanProperty(value);
      if (value !== this.hasBackDrop) {
          this.hasBackDrop = value;
          this._recreatePopover();
      }
  }
  get slbPopoverHasBackdrop() {
      return this.hasBackDrop;
  }

  @Output() onClose = new EventEmitter();
  @Output() closed = new EventEmitter();
  @Output() onOpen = new EventEmitter();
  @Output() opened = new EventEmitter();

  @ViewChild(SlbPopoverDirective, { static: true }) popoverDirective: SlbPopoverDirective;

  private backDropClass: string;
  private hasBackDrop: boolean = false;

  private _recreatePopover() {
      if (this.popoverDirective) {
          const isOpened = this.popoverDirective.isOpened;
          if (isOpened) {
              this.popoverDirective.closePopover();
          }
          this.popoverDirective.destroyPopover(); // to refresh settings
          if (isOpened) {
              setTimeout(() => this.popoverDirective.openPopover());
          }
      }
  }
  accessTokenValidator(control: any) {
    return control.value === 'dcoedemo' ? null : { invalidAccessToken: true };
  }

  get accessToken() {
    return this.form.get('accessToken');
  }

  get value() {
    return this.form.get('value');
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });

    this.loadData();
    this.refreshInterval = setInterval(() => this.loadData(), 180000);
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
  submitForm(tagId: number): void {
    if (this.form.valid) {
      const { value } = this.form.controls;
      this.apiService.setPointWrite(tagId, +value.value)
        .subscribe(
          response => {
            console.log('设置成功', response);
            console.log(tagId, value.value)
            alert("Update Successfully");
          },
          error => {
            console.error('设置失败', error);
            // 可以在这里处理错误情况
            alert("Some Error Happens");
          }
        );
    }
  }
  updateSelectedRows(): void {
    this.selectedRows = this.selectedRows.map(selected => {
      const correspondingData = this.dataSource.data.find(data => data.tagName === selected.tagName && data.deviceId === selected.deviceId);
      return correspondingData ? { ...selected, ...correspondingData } : selected;
    });
  }
}

