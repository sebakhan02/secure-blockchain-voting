import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentication',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  code: string[] = ['', '', '', '', '', ''];
  inputs = new Array(6); // for ngFor

  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;

  onInput(event: any, index: number): void {
    const input = event.target;
    const value = input.value;

    if (value && index < this.codeInputs.length - 1) {
      this.codeInputs.toArray()[index + 1].nativeElement.focus();
    }
  }
}
