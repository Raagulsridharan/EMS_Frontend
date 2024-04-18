import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../../model_class/department';
import { Employee } from '../../../model_class/employee';
import { AdminService } from '../../../services/admin.service';
import { LeaveType } from '../../../model_class/leaveType';

@Component({
  selector: 'app-leaveassign',
  templateUrl: './leaveassign.component.html',
  styleUrl: './leaveassign.component.scss'
})
export class LeaveassignComponent implements OnInit{

  formData!: FormGroup;
  departments: Department[] = [];
  employees: Employee[] = [];
  leaveTypes: LeaveType[] = [];

  selectedDepartmet!: number;
  selectedEmployee!: number;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchDepartments();
    this.fetchAllLeaveTypes();
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      departmentId: ['', Validators.required],
      employeeId: ['', Validators.required],
      leaveId: ['', Validators.required],
      noOfDays: ['', Validators.required]
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

  fetchEmployeesByDepartment(departmentId: number): void {
    this.adminService.getEmployeesForLeaveAssigningByDepartment(departmentId).subscribe(
      (employees) =>{
        this.employees = employees.data || [];
        console.log(employees);
      },
      (error) =>{
        console.log('Error fetching employees:', error);
      }
    );
  }

  fetchAllLeaveTypes():void{
    this.adminService.getAllLeaveType().subscribe(
      (leaves) => {
        this.leaveTypes = leaves.data || [];
        console.log(leaves);
      },
      (error) => {
        console.log('Error fetching departments:', error);
      }
    ); 
  }

}
