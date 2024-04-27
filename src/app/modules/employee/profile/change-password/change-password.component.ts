import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  
  @Input() employee!: any;

  myForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<ChangePasswordComponent>
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      newpassword: ['', Validators.required],
      confirmnewpassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  togglePasswordVisibility(controlName: string): void {
    if (controlName === 'newpassword') {
      this.showPassword = !this.showPassword;
    } else if (controlName === 'confirmnewpassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  updatePassword(): void {
    // Implement your password update logic here
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newpassword');
    const confirmNewPassword = control.get('confirmnewpassword');
    if (newPassword.value !== confirmNewPassword.value) {
      return { 'passwordsMatch': true };
    }
    return null;
  }

}
