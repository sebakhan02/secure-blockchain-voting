import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../../../interfaces/toast.service';

@Component({
  selector: 'app-authentication',
  imports: [ CommonModule, FormsModule ],
  standalone: true,
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  code: string[] = ['', '', '', '', '', ''];
  inputs = new Array(6); // for ngFor

  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;

  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  // Automatically focus on the next input field when a value is entered
  onInput(event: any, index: number): void {
    const input = event.target;
    const value = input.value;

    if (value && index < this.codeInputs.length - 1) {
      this.codeInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  // Handle backspace to focus the previous input field
  onKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && index > 0) {
      this.codeInputs.toArray()[index - 1].nativeElement.focus();
    } else if (event.key === 'Delete') {
      this.code[index] = ''; // Clear current input field if 'Delete' is pressed
    }
  }

  // Handle pasting of the verification code (paste 6 digits)
  onPaste(event: ClipboardEvent, index: number): void {
    const clipboardData = event.clipboardData || (window as any)['clipboardData'];
    const pastedData = clipboardData.getData('Text');
    
    // If the pasted data contains exactly 6 digits, split and populate the fields
    if (pastedData.length === 6) {
      this.code = pastedData.split('');
      this.codeInputs.forEach((input, i) => {
        input.nativeElement.value = this.code[i];
      });
    }
  }

  // Handle the verification of the code entered by the user
  onVerify(): void {
    const fullCode = this.code.join('');

    if (fullCode.length !== 6) {
      this.toast.show('Please enter the full 6-digit code.', 'error');
      return;
    }

    this.http.post('http://localhost:8000/verify-code/', {
      email: this.email,
      code: fullCode
    }).subscribe({
      next: () => {
        this.toast.show('Email verified successfully!', 'success');
        this.router.navigate(['/signin']);
      },
      error: (err) => {
        const msg = err.error?.error || 'Verification failed. Please try again.';
        this.toast.show(msg, 'error');
      }
    });
  }
}