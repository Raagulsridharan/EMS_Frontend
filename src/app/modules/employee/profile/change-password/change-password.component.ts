import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  myForm: FormGroup;

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

  updatePassword(): void {
    if(this.myForm.valid){
      if(this.myForm.value.newpassword===this.myForm.value.confirmnewpassword){
        this.employeeService.changePassword(this.employee.id,this.myForm.value.newpassword)
        .subscribe(()=>{
          console.log('password changed!');
          this.myForm.reset();
          this.modalRef.close();
        });
      }
    }
  }

}
