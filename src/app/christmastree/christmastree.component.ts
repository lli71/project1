// import { Component } from '@angular/core';
// import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
// import { SlbPopoverDemoComponent } from '../slb-popover-demo/slb-popover-demo.component';
// import { MatDialog } from '@angular/material/dialog';
// @Component({
//   selector: 'app-christmastree',
//   templateUrl: './christmastree.component.html',
//   styleUrls: ['./christmastree.component.css']
// })
// export class ChristmastreeComponent {

//   constructor(public dialog: MatDialog) {}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
//       width: '350px',
//       data: { title: 'Remote Access' }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         alert('Update Successfully');
//         // 执行相关操作
//       } else {
//         alert('Canceled');
//         // 执行相关操作
//       }
//     });
//   }
// }
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SlbPopoverDirective } from '@slb-dls/angular-material/popover';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
@Component({
  selector: 'app-christmastree',
  templateUrl: './christmastree.component.html',
  styleUrls: ['./christmastree.component.css']
})
export class ChristmastreeComponent {
  // popoverOpen = true;

  // onClosed(event: any) {
  //   console.log('Popover closed', event);
  //   this.popoverOpen = false;
  // }

  // onOpened(event: any) {
  //   console.log('Popover opened', event);
  //   this.popoverOpen = true;
  // }

  // onClose(event: any) {
  //   console.log('Closing popover', event);
  // } 
  //for simple UI

  // onOpen(event: any) {
  //   console.log('Opening popover', event);
  // }
  
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
}