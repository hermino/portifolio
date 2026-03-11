import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toast = signal<Toast | null>(null);

  show(message: string, type: ToastType = 'info') {
    this.toast.set({ message, type });
    setTimeout(() => this.toast.set(null), 3500);
  }

  success(message: string) { this.show(message, 'success'); }
  error(message: string)   { this.show(message, 'error'); }
  info(message: string)    { this.show(message, 'info'); }
  warning(message: string) { this.show(message, 'warning'); }
}
