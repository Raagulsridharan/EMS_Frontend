import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';
import { EmployeeService } from '../../../../services/employee.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  
  @Input() employee!: any;

  hidePassword: boolean = true;

  myForm: FormGroup = new FormGroup({
    newpassword: new FormControl(''),
    confirmnewpassword: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    public modalRef: MdbModalRef<ChangePasswordComponent>
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      newpassword: ['', Validators.required],
      confirmnewpassword: ['', Validators.required]
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
    if(this.myForm.valid){
      if(this.myForm.value.newpassword===this.myForm.value.confirmnewpassword){
        this.employeeService.changePassword(this.employee.id,this.myForm.value.newpassword)
        .subscribe(()=>{
          console.log('password changed!');
          this.myForm.reset();
          this.modalRef.close();
        });
      }else{
        alert('enter correct passwords!');
        this.myForm.reset();
        return;
      }
    }
  }

}
