import { Component, Input, OnInit } from '@angular/core';
import { Department } from '../../../../model_class/department';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

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

  formData!: FormGroup;
  departments: Department[] = [];

  constructor(
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
    });
  }

  fetchDepartments(): void {
    this.adminService.getAllDepartments().subscribe(
      (departments) => {
        this.departments = departments.data || [];
        console.log(departments);
      },
      (error) => {
        console.log('Error fetching departments:', error);
      }
    );
  }

  isDepartmentDisabled(departmentName: any): boolean {
    return departmentName === this.deptName;
  }

  updateEmployee(): void {
    console.log(this.formData.value.departmentId);
    this.adminService
      .updateEmployee(
        this.empId,
        this.formData.value.departmentId,
        this.mobille,
        this.address
      )
      .subscribe(
        (response) => {
          console.log('Employee updated successfully:', response.data);
          this.formData.reset();
        },
        (error) => {
          alert('Error in updating employee...!');
          console.error('Error updating employee:', error);
          this.formData.reset();
        }
      );
  }
}
