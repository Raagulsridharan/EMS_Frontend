import { Component, Input, OnInit } from '@angular/core';
import { Department } from '../../../../model_class/department';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Designation } from '../../../../model_class/designation';
import { ToastrService } from 'ngx-toastr';
import { DesignationService } from '../../../../services/designation.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss',
})
export class UpdateEmployeeComponent implements OnInit {
  @Input() empId!: number;
  @Input() empName!: string;
  @Input() deptName!: Department;
  @Input() mobille!: number;
  @Input() address!: string;

  formData: FormGroup = new FormGroup({
    departmentId: new FormControl(''),
    roleId: new FormControl(''),
    salary: new FormControl(''),
  });

  departments: Department[] = [];
  roles: Designation[] = [];

  constructor(
    private toastr: ToastrService,
    private designationService: DesignationService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    public modalRef: MdbModalRef<UpdateEmployeeComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchDepartments();
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      departmentId: ['', Validators.required],
      roleId: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  get formControls() {
    return this.formData.controls;
  }

  get departmentId() {
    return this.formData.get('departmentId');
  }

  get roleId() {
    return this.formData.get('roleId')!;
  }

  get salary() {
    return this.formData.get('salary')!;
  }

  fetchDepartments(): void {
    this.adminService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments.data || [];
        //console.log(departments);
      },
      error: (error) => {
        //console.log('Error fetching departments:', error);
      },
    });
  }

  isDepartmentDisabled(departmentName: any): boolean {
    return departmentName === this.deptName;
  }

  fetchRoleByDepartment(departmentId: number): void {
    this.roles.splice(0, this.roles.length);
    this.designationService.getRolesByDepartment(departmentId).subscribe({
      next: (response) => {
        this.roles = response || [];
      },
      error: (error) => {
        //console.log('Error fetching employees:', error.error.message);
      },
    });
  }

  updateEmployee(): void {
    this.isCompetencyFormValid();
    if (this.formData.valid) {
      this.adminService
        .updateEmployeeDepartmentRoleSalary(
          this.empId,
          this.formData.value.departmentId,
          this.formData.value.roleId,
          this.formData.value.salary
        )
        .subscribe({
          next: (response) => {
            //console.log('Employee updated successfully:', response.data);
            this.toastr.success('Successfully Updated');
            this.formData.reset();
          },
          error: (error) => {
            // alert('Error in updating employee...!');
            // console.error('Error updating employee:', error);
            this.toastr.warning('Assign role first!')
            this.formData.reset();
          },
        });
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
