import { Component, OnInit } from '@angular/core';
import { Department } from '../../../../model_class/department';
import { AdminService } from '../../../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  formData!: FormGroup;
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
      alert('Error...!')
      console.log("ElsePart In OnSubmit()")
      // Handle form validation errors
    }
  }
}
