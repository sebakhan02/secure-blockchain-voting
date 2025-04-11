import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-landingpage',
  imports: [CommonModule, RouterModule, HeaderComponent],
  standalone: true,
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

}
