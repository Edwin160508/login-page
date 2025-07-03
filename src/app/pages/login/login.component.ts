import { Component, OnDestroy, OnInit } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DefaultLoginLayoutComponent,
    PrimaryInputComponent
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  private emailValueChangesSubscription?: Subscription;
  ngOnInit(): void {
    this.emailValueChangeListener();    
  }

  ngOnDestroy(): void {        
    if (this.emailValueChangesSubscription) {
      this.emailValueChangesSubscription.unsubscribe();
    }    
  }
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
      password: new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(6)])
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      //console.log('Form submitted:', formData);
      this.loginFake();// apenas navega para home, sem autenticação real.
      /*this.loginService.login(formData.email, formData.password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);                   
          this.router.navigate(['main']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.toastService.error('Login erro inesperado! Tente novamente mais tarde.', 'Error');
        }
      })*/
    } else {
      console.log('Form is invalid');
    }
  }

  navigate(): void {
    this.router.navigate(['signup']);
  }

  loginFake(): void {
    this.router.navigate(['main']);
  }

  emailValueChangeListener(): void {
    const emailControl = this.loginForm.get('email');
    if (emailControl) {
      this.emailValueChangesSubscription = emailControl.valueChanges.subscribe(() => {
        this.habilitarCampoSenha();
      });
    }
  }
  
  habilitarCampoSenha(): void {
    if (this.loginForm.get('email')?.valid) {
      this.loginForm.get('password')?.enable();
    } else {
      this.loginForm.get('password')?.disable();
    }
  }
}
