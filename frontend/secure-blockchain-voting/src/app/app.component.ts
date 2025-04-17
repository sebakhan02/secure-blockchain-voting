import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastComponent } from "./pages/toast/toast.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule, ToastComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'secure-blockchain-voting';
}
