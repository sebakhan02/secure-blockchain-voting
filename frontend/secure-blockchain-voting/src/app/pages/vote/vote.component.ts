import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vote',
  imports: [ CommonModule, RouterModule ],
  standalone: true,
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css'
})
export class VoteComponent {

}
