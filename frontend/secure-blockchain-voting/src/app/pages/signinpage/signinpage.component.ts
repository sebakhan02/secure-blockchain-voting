import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signinpage',
  imports: [HeaderComponent, CommonModule],
  standalone: true,
  templateUrl: './signinpage.component.html',
  styleUrl: './signinpage.component.css'
})
export class SigninpageComponent {


  email: string = '';
  password: string = '';
  loading = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.loading = true;
    // Simulate a login request
    setTimeout(() => {
      this.loading = false;
      // Navigate to the dashboard or home page after successful login
      this.router.navigate(['/dashboard']);
    }, 2000); // Simulate a 2-second delay for the request
  }
}
