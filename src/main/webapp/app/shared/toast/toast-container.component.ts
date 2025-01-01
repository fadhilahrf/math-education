import { Component } from '@angular/core';
import { ToastService } from './toast.service';
import SharedModule from '../shared.module';

@Component({
  selector: 'toasts',
  imports: [SharedModule],
  standalone: true,
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
        <ng-template ngbToastHeader>
            <div class="me-auto fw-bold" [ngClass]="toast.headerClassname">
                {{ toast.header }}
            </div>
        </ng-template>
      {{ toast.body }}
    </ngb-toast>
  `,
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 9999' }
})
export class ToastsContainerComponent {
  constructor(public toastService: ToastService) { }
}