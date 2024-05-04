import { Component, OnInit } from '@angular/core';
import { Department } from '../../../../model_class/department';
import { AdminService } from '../../../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../../model_class/employee';
import { LoginDetails } from '../../../../model_class/loginDetails';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  formData: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    email: new FormControl(''),
    departmentId: new FormControl('')
  });
  departments: Department[] = [];
  employeeData: Employee = new Employee();
  loginDetails: LoginDetails = new LoginDetails();

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.initForm();
  }

  get formControls() {
    return this.formData.controls;
  }

  get firstName() {
    return this.formData.get('firstName')!;
  }

  get email() {
    return this.formData.get('email')!;
  }

  get departmentId() {
    return this.formData.get('departmentId')!;
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      address: ['', Validators.required],
      departmentId: ['', Validators.required]
    });
  }

  loadDepartments(): void {
    this.adminService.getAllDepartments().subscribe({
      next:(response) =>{
        if (response.data){
          this.departments = response.data;
        }
      },
      error:(error) =>{
        console.log('Error fetching departments:', error);
      }
    });
  }

  onSubmit(): void {
    this.isCompetencyFormValid();
    if (this.formData.valid) {
      const empName = this.formData.value.firstName + ' ' + this.formData.value.lastName;
      this.employeeData = { ...this.formData.value, emp_name: empName };
      this.adminService.addEmployee(this.employeeData).subscribe({
        next: (response:any) => {
          this.formData.reset();
          this.router.navigateByUrl('/admin/employee');
          this.toastr.success('Successfully Profile created!'+response.employee.name)
          // this.loginDetails.username = response.username;
          // this.loginDetails.password = response.password;
          // this.loginDetails.deptId = response.employee.department.id;
          // this.adminService.sentEmailForLoginCredential(this.loginDetails).subscribe(
          //   (response)=>{
          //     console.log(response);
          //   }
          // );
        },
        error: (error) => {
          this.toastr.error(''+error.error.message)
        }
      });
    } else {
      console.log("ElsePart In OnSubmit()")
    }
  }

  private isCompetencyFormValid() {
    if (this.formData.invalid) {
      for (const control of Object.keys(this.formData.controls)) {
        this.formData.controls[control].markAsTouched();
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
}

function _isNil(data: any) {
  throw new Error('Function not implemented.');
}

