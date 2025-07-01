import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DefaultLoginLayoutComponent,
    PrimaryInputComponent
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Form submitted:', formData);
      this.loginService.login(formData.email, formData.password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.toastService.success('Login realizado.', 'Success');
          //this.router.navigate(['home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.toastService.error('Login erro inesperado! Tente novamente mais tarde.', 'Error');
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }

  navigate(): void {
    this.router.navigate(['signup']);
  }


}
