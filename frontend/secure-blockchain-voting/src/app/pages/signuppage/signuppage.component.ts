import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../../../interfaces/toast.service';

@Component({
  selector: 'app-signuppage',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './signuppage.component.html',
  styleUrl: './signuppage.component.css'
})
export class SignuppageComponent {

  signupForm: FormGroup;


  constructor(private fb: FormBuilder,  private toast: ToastService,private router: Router
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      regNumber: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{4}-\d{2}-\d{4}-\d{4}$/)
      ]],
      course: ['', [Validators.required, Validators.maxLength(7)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  loading = false;

  onSubmit() {
    if (this.signupForm.valid) {
      this.loading = true;
      const sanitizedData = this.sanitize(this.signupForm.value);
  
      // Send data to backend
      fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: sanitizedData.fullName,
          email: sanitizedData.email,
          reg_number: sanitizedData.regNumber,
          course: sanitizedData.course,
          password: sanitizedData.password
        })
      })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');
  
        this.toast.show('Registered successfully! Check your email.', 'success');
        
        // Redirect to code verification screen with the user's email
        this.router.navigate(['/auth'], {
          queryParams: { email: sanitizedData.email }
        });
  
      })
      .catch(err => {
        this.toast.show(err.message || 'Something went wrong', 'error');
      })
      .finally(() => {
        this.loading = false;
      });
    } else {
      this.toast.show('Please fix form errors.', 'error');
    }
  }
  
  
  

  sanitize(data: any) {
    // remove leading/trailing whitespaces and strip script tags
    const clean = (value: string) => value.replace(/<[^>]*>/g, '').trim();
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = typeof data[key] === 'string' ? clean(data[key]) : data[key];
      return acc;
    }, {} as any);
  }

}
