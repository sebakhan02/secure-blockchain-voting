import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../interfaces/toast.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signinpage',
  imports: [HeaderComponent, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './signinpage.component.html',
  styleUrl: './signinpage.component.css'
})
export class SigninpageComponent {


  email: string = '';
  password: string = '';
  loading = false;

  constructor(private router: Router,  private toast: ToastService, private http: HttpClient) {}


  onSubmit() {
    this.loading = true;
    this.http.post('http://localhost:8000/auth/login/', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.router.navigate(['/auth'], { queryParams: { email: this.email } });
      },
      error: (err) => {
        this.loading = false;
        const msg = err.error?.error || 'Login failed.';
        this.toast.show(msg, 'error');
  
        // Still redirect to code entry screen if account needs verification
        if (err.error?.redirect === 'verify') {
          this.router.navigate(['/auth'], { queryParams: { email: this.email } });
        }
      }
    });
  }
  
  goToSignup() {
    this.router.navigate(['/signup']);
  }

}
