import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SlbPopoverDirective } from '@slb-dls/angular-material/popover';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'slb-popover-demo',
    templateUrl: './slb-popover-demo.component.html',
    styleUrls: ['./slb-popover-demo.component.scss'],
})
export class SlbPopoverDemoComponent {
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
