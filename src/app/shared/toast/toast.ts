import { Component } from '@angular/core';
import { ToastService } from '../toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {

  message = '';
  showToast = false;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe(msg => {
      this.message = msg;
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    });
  }
}
