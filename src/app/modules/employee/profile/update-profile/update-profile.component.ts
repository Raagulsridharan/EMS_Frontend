import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';
import { EmployeeService } from '../../../../services/employee.service';
import { Employee } from '../../../../model_class/employee';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
})
export class UpdateProfileComponent implements OnInit {
  formData: any;
  @Input() employee!: any;

  defaultName: string = '';
  defaultEmail: string = '';
  defaultMobile: string = '';
  defaultAddress: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public modalRef: MdbModalRef<UpdateProfileComponent>,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.defaultName = this.employee.emp_name;
    this.defaultEmail = this.employee.email;
    this.defaultMobile = this.employee.mobile;
    this.defaultAddress = this.employee.address;
    this.formData = this.formBuilder.group({
      updateName: [this.defaultName, [Validators.required]],
      updateEmail: [this.defaultEmail, [Validators.required]],
      updateMobile: [this.defaultMobile, [Validators.required]],
      updateAddress: [this.defaultAddress, [Validators.required]],
    });
  }

  onInput1(event: Event) {
    this.defaultName = (event.target as HTMLInputElement).value;
  }

  onInput2(event: Event) {
    this.defaultEmail = (event.target as HTMLInputElement).value;
  }

  onInput3(event: Event) {
    this.defaultMobile = (event.target as HTMLInputElement).value;
  }

  onInput4(event: Event) {
    this.defaultAddress = (event.target as HTMLInputElement).value;
  }

  updateProfile(): void {
    console.log(this.formData.value);
    if (this.formData.valid) {
      this.employeeService.updateEmployeeProfile(this.employee.id,this.formData.value,this.employee.departmentId).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response.data);
          this.formData.reset();
          this.modalRef.close();
          window.location.reload();
        },
        (error) => {
          alert('Error in updating Profile...!'+this.employee.name);
          console.error('Error updating Profile:', error);
          this.formData.reset();
        }
      );
    }
  }
}
