import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from  '../../services/auth.service';

@Component({
  selector: 'app-userdashboard',
  imports: [ CommonModule, RouterModule ],
  standalone: true,
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent {

  constructor(private authService: AuthService) { }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  isDropdownOpen = false;

  @ViewChild('dropdownRef') dropdownRef!: ElementRef;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInside = this.dropdownRef?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }

isMobile = false;

ngOnInit() {
  this.checkScreenSize();
  window.addEventListener('resize', () => this.checkScreenSize());
}

checkScreenSize() {
  this.isMobile = window.innerWidth < 768;
  if (this.isMobile) {
    this.isSidebarOpen = false;
  }
}
logout() {
  this.authService.logout();
}
  
}
