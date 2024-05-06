import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmpFlag } from '../../model_class/empFlag';
import { HttpStatusClass } from '../../model_class/httpStatusClass';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activation-page',
  templateUrl: './activation-page.component.html',
  styleUrl: './activation-page.component.scss',
})
export class ActivationPageComponent implements OnInit {
  empId!: string;
  hidePassword: boolean = true;

  myForm: FormGroup = new FormGroup({
    newpassword: new FormControl(''),
    confirmnewpassword: new FormControl(''),
  });

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.empId = params['id'];
    });
    this.myForm = this.formBuilder.group({
      newpassword: ['', Validators.required],
      confirmnewpassword: ['', Validators.required],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  get formControls() {
    return this.myForm.controls;
  }

  get newpassword() {
    return this.myForm.get('newpassword')!;
  }

  get confirmnewpassword() {
    return this.myForm.get('confirmnewpassword')!;
  }
  private isCompetencyFormValid() {
    if (this.myForm.invalid) {
      for (const control of Object.keys(this.myForm.controls)) {
        this.myForm.controls[control].markAsTouched();
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

  updatePassword(): void {
    this.isCompetencyFormValid();
    if (this.myForm.invalid) {
      return;
    }

    const newPassword = this.myForm.value.newpassword;
    const confirmNewPassword = this.myForm.value.confirmnewpassword;

    if (newPassword !== confirmNewPassword) {
      this.toastr.error('Enter Correct Password!');
      this.myForm.reset();
      return;
    }

    this.authService.updatePassword(this.empId, newPassword).subscribe(
      () => {
        this.toastr.success('Successfully account activated!');
        this.router.navigate(['']);
      },
      (error) => {
        //console.error('Error updating password:', error);
        this.toastr.error('Error updating password:');
      }
    );
  }
}
