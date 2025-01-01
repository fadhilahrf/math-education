import { Injectable } from '@angular/core';

interface Toast {
  header: string;
  body: string;
  delay?: number;
  headerClassname?: string;
  classname?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];

  show(header: string, body: string, delay: number = 5000, headerClassname: string = '', classname: string = '') {
    this.toasts.push({ header, body, delay, headerClassname, classname });
    console.log('toast show')
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
