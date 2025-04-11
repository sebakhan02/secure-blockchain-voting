import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ CommonModule, RouterModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    // This is a  mobile menu toggle 
    isMobileMenuOpen = false;

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    isHeaderShrunk = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
      this.isHeaderShrunk = window.scrollY > 10;
    }
}
