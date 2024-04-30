import { Component, OnInit } from '@angular/core';
import { Department } from '../../../../model_class/department';
import { AdminService } from '../../../../services/admin.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
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
      birthday: [''],
      gender: [''], // Add form control for gender
      email: [''],
      mobile: [''],
      address: [''],
      departmentId: [''] // Add form control for department if needed
    });
  }

  loadDepartments(): void {
    this.adminService.getAllDepartments().subscribe(
      (departments) => {
        this.departments = departments.data;
        console.log(departments);
      },
      (error) => {
        console.log('Error fetching departments:', error);
      }
    );
  }

  onSubmit(): void {
    this.isCompetencyFormValid();
    if (this.formData.valid) {
      const empName = this.formData.value.firstName + ' ' + this.formData.value.lastName;
      const formDataWithEmpName = { ...this.formData.value, emp_name: empName };
      console.log(formDataWithEmpName); // Use this to send the form data to backend
      this.adminService.addEmployee(formDataWithEmpName).subscribe(
        (response) => {
          console.log('Employee added successfully:', response);
          this.formData.reset();

          const email:string = response.data.username;
          const password:string = response.data.password;
          const deptId:number = response.data.employee_login.department.id;
          this.adminService.sentEmailForLoginCredential(email, password, deptId).subscribe(
            (response)=>{
              console.log(response);
            }
          );
          this.router.navigateByUrl('/admin/employee');
        },
        (error) => {
          alert('Error in adding employee...!')
          console.error('Error adding employee:', error);
          this.formData.reset();
        }
      );
    } else {
      //alert('Error...!')
      console.log("ElsePart In OnSubmit()")
      // Handle form validation errors
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
