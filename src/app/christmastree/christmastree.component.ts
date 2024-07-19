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
import { Router, RoutesRecognized } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-christmastree',
  templateUrl: './christmastree.component.html',
  styleUrls: ['./christmastree.component.css']
})
export class ChristmastreeComponent {
  form: FormGroup;
  // popoverOpen = true;
  iconPosition1 = { x: '47%', y: '62%' }; 
  iconPosition2 = { x: '45%', y: '35%' }; 
  iconPosition3 = { x: '50%', y: '34%' }; 
  iconPosition4 = { x: '43%', y: '49%' }; 
  iconPosition5 = { x: '51%', y: '38%' }; 
  iconPosition6 = { x: '50%', y: '56%' }; 
  iconPosition7 = { x: '49%', y: '54%' }; 
  iconPosition8 = { x: '50%', y: '62%' }; 


  // onClosed(event: any) {
  //   console.log('Popover closed', event);
  //   this.popoverOpen = false;
  // }

  navigateToPage1() {
    this.router.navigate(['/modum-gas']); // Navigate to the "modum gas" page
  }
  navigateToPage2() {
    this.router.navigate(['/modum-flow']); // Navigate to the "modum gas" page
  }
  navigateToPage3() {
    this.router.navigate(['/three-eletric-actuator']); // Navigate to the "modum gas" page
  }
  navigateToPage4() {
    this.router.navigate(['/six-eletric-actuator']); // Navigate to the "modum gas" page
  }
  navigateToPage5() {
    this.router.navigate(['/hydralic-actuator']); // Navigate to the "modum gas" page
  }
  navigateToPage6() {
    this.router.navigate(['/automated-pressure-vent-valve']); // Navigate to the "modum gas" page
  }
  navigateToPage7() {
    this.router.navigate(['/ptms']); // Navigate to the "modum gas" page
  }
  navigateToPage8() {
    this.router.navigate(['/modum-chem']); // Navigate to the "modum gas" page
  }

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
constructor(
    private router: Router, private fb: FormBuilder
   
) {
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
}