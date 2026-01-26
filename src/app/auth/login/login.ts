import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { authService } from '../auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: authService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    //console.log('Login payload:', this.loginForm.value);
    // error message
    this.errorMessage = '';

    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        alert('Login successful');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);

        if (err.status === 409) {
          this.errorMessage = err.error?.message || 'Concurrent login detected';
        } else if (err.status === 401 || err.status === 400) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'Something went wrong';
        }
      }
    });
  }
}
