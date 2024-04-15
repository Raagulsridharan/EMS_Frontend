import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmpFlag } from '../../model_class/empFlag';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm: FormGroup | any;
  hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  submitForm() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe((result: EmpFlag) => {
      console.log(result);
      if (result.flag === 0) {
        this.router.navigate(['/accountActivation', result.empId]);
      } else if (result.flag === 1) {
        this.router.navigate(['/admin']);
        // this.authService.getUserType(email).subscribe((userType: string) => {
        //   if (userType === 'admin') {
        //     this.router.navigate(['/admin/dashboard']);
        //   } else {
        //     this.router.navigate(['/employee/home']);
        //   }
        // });
      } else {
        console.log('else submitform');
      }
    });
  }
}
