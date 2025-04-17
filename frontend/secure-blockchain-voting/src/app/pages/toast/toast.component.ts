import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from '../../../../interfaces/toast.service';

@Component({
  selector: 'app-toast',
  imports: [ CommonModule ],
  templateUrl: './toast.component.html',
  standalone: true,
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  toast$: Observable<any>;

  constructor(private toastService: ToastService) {
    this.toast$ = this.toastService.toast$;
  }

}
