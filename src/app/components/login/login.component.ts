import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.getUsersByEmail(email as string).subscribe(
      (data) => {
        if (data.length > 0 && data[0].password === password) {
          sessionStorage.setItem('email', email as string);
          sessionStorage.setItem('nome', data[0].firstName as string);
          if (data[0].admin === true) {
            const adminAsString = String(data[0].admin);
            sessionStorage.setItem('admin', adminAsString);
          }
          this.router.navigate(['/home']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ou senha incorretos' });
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      },
    );
  }
}
