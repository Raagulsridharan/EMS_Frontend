import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmpFlag } from '../../model_class/empFlag';
import { MdbTabChange } from 'mdb-angular-ui-kit/tabs';
import { HttpStatusClass } from '../../model_class/httpStatusClass';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onTabChange(event: MdbTabChange): void {
    console.log(event);
  }

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

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  private isCompetencyFormValid() {
    if (this.loginForm.invalid) {
      for (const control of Object.keys(this.loginForm.controls)) {
        this.loginForm.controls[control].markAsTouched();
      }
      this.scrollToError();
      return false;
    } else {
      return true;
    }
  }

  scrollToValidationMessage(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  scrollToError(): void {
    const firstElementWithError: HTMLElement = document.querySelector(
      '.ng-invalid[formControlName]'
    );
    this.scrollToValidationMessage(firstElementWithError);
  }

  submitForm() {
    this.isCompetencyFormValid();
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.login(email, password).subscribe((result: EmpFlag) => {
        console.log(result);
        if (result.flag === 0) {
          this.router.navigate(['/accountActivation', result.empId]);
        } else if (result.flag === 1) {
          //this.router.navigate(['/admin']);
          this.authService
            .getUserType(email)
            .subscribe((userType: HttpStatusClass) => {
              console.log(userType);
              const user: string[] = userType.data;
              if (user.includes('Admin')) {
                this.router.navigate(['/admin/dashboard']);
              } else {
                alert('You are not an admin!!!');
              }
            });
        } else {
          console.log('else submitform');
        }
      });
    }
  }

  employeeLogin() {
    this.isCompetencyFormValid();
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.login(email, password).subscribe((result: EmpFlag) => {
        console.log(result);
        if (result.flag === 0) {
          this.router.navigate(['/accountActivation', result.empId]);
        } else if (result.flag === 1) {
          localStorage.setItem('employeeId', String(result.empId));
          this.router.navigate(['/employee']);
        } else {
          console.log('else submitform');
        }
      });
    }
  }
}
