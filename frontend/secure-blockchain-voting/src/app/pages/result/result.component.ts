import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-result',
  imports: [ CommonModule, RouterModule, ],
  standalone: true,
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
  animations: [
    trigger('expandCollapse', [
      state('void', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
      state('*', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      transition('void <=> *', animate('300ms ease')),
    ])
  ]
})
export class ResultComponent {

  selectedElectionId: number | null = null;

  isExpanded(id: number): boolean {
    return this.selectedElectionId === id;
  }

  toggleDetails(id: number): void {
    this.selectedElectionId = this.selectedElectionId === id ? null : id;
  }
}
