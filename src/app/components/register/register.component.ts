import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User[] = [];

  registerForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      secondName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      confirmPassword: ['', Validators.required],
      date: ['', Validators.required],
      admin: false,
    },
    {
      validators: passwordMatchValidator,
    },
  );
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  get firstName() {
    return this.registerForm.controls['firstName'];
  }

  get secondName() {
    return this.registerForm.controls['secondName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  get date() {
    return this.registerForm.controls['date'];
  }

  get admin() {
    return this.registerForm.controls['admin'];
  }

  registerUser() {
    const postData = { ...this.registerForm.value };
    this.authService.getUsersByEmail(String(postData.email)).subscribe((data) => {
      this.user = data;
      if (this.user.length === 0) {
        if (postData.admin) {
          postData.admin = true;
        }

        delete postData.confirmPassword;
        this.authService.registerUser(postData as User).subscribe(
          (data) => {
            console.log(data);
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso' });
            this.router.navigate(['login']);
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
          },
        );
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email já cadastrado' });
      }
    });
  }
}
