import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    if (this.loginForm.invalid) {
      console.warn('[Login] Form invalid, refusing to submit.', this.loginForm.value);
      this.loginForm.markAllAsTouched();
      return;
    }

    const login: Login = {
      username: this.loginForm.value.username || "",
      password: this.loginForm.value.password || "",
    };

    console.log('[Login] Attempting login for user:', login.username);

    this.authService.login(login).subscribe({
      next: (response) => {
        console.log('[Login] Success. Token received, navigating home.', response);
        this.errorMessage = '';
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('[Login] Failed.', error);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
        this.loginForm.setErrors({ loginFailed: true });
      },
    });
  }
}
