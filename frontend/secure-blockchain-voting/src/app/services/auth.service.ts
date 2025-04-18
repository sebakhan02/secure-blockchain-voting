import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router:Router ) { }
  logout() {
    // Clear localStorage or sessionStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  
    // Optionally clear any other auth-related data
    localStorage.clear(); // If you want to remove everything
  
    // Navigate to landing or login
    this.router.navigate(['/']);
  }
  
}
