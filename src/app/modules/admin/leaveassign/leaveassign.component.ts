import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../../model_class/department';
import { Employee } from '../../../model_class/employee';
import { AdminService } from '../../../services/admin.service';
import { LeaveType } from '../../../model_class/leaveType';
import { LeaveAssign } from '../../../model_class/leaveAssign';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeHasLeave } from '../../../model_class/employeeHasLeave';
import { HttpStatusClass } from '../../../model_class/httpStatusClass';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UpdateLeaveAssignComponent } from './update-leave-assign/update-leave-assign.component';

@Component({
  selector: 'app-leaveassign',
  templateUrl: './leaveassign.component.html',
  styleUrl: './leaveassign.component.scss',
})
export class LeaveassignComponent implements OnInit {
  formData!: FormGroup;
  departments: Department[] = [];
  employees: Employee[] = [];
  leaveTypes: LeaveType[] = [];
  leaveAssignList: LeaveAssign[] = [];

  selectedDepartmet!: number;
  selectedEmployee!: number;

  constructor(
    private modalService: MdbModalService,
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
      noOfDays: ['', Validators.required],
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
    this.adminService
      .getEmployeesForLeaveAssigningByDepartment(departmentId)
      .subscribe(
        (employees) => {
          this.employees = employees.data || [];
          console.log(employees);
        },
        (error) => {
          console.log('Error fetching employees:', error);
        }
      );
  }

  fetchAllLeaveTypes(): void {
    this.adminService.getAllLeaveType().subscribe(
      (leaves:HttpStatusClass) => {
        this.leaveTypes = leaves.data || [];
        console.log(leaves);
        this.initLeaveTypeFormControls();
      },
      (error) => {
        console.log('Error fetching departments:', error);
      }
    );
  }

  initLeaveTypeFormControls(): void {
    // Dynamically add form controls for each leave type
    this.leaveTypes.forEach((leaveType, index) => {
      this.formData.addControl(
        `leaveId${index}`,
        this.formBuilder.control('', Validators.required)
      );
      this.formData.addControl(
        `noOfDays${index}`,
        this.formBuilder.control('', Validators.required)
      );
    });
  }

  submitForm(): void {
    console.log(this.formData);
    const empId: number = this.formData.value.employeeId;
    this.leaveAssignList = [];
    this.leaveTypes.forEach((leaveType, index) => {
      const leaveId = this.formData.get(`leaveId${index}`)?.value;
      const noOfdays = this.formData.get(`noOfDays${index}`)?.value;
      if (leaveId !== null && noOfdays !== null) {
        this.leaveAssignList.push({
          leaveId: leaveId.toString(),
          noOfdays: +noOfdays,
        });
      }
    });
    console.log(empId, this.leaveAssignList);
    this.adminService
      .assignLeaveForEmployee(empId, this.leaveAssignList)
      .subscribe(
        (response) => {
          console.log('Response from backend:', response);
          this.formData.reset();
        },
        (error) => {
          console.error('Error from backend:', error);
          this.formData.reset();
        }
      );
  }

  //----------------------------------------------------

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = [
    'id',
    'empName',
    'department',
    'role',
    'activatedOn',
    'actions',
  ];
  dataSource = new MatTableDataSource<EmployeeHasLeave>();

  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService
      .getAllEmployeesHasLeave()
      .subscribe((response: HttpStatusClass) => {
        if (response.statusCode === 200) {
          // Assign the data to the dataSource
          console.log(response.data);
          this.dataSource.data = response.data;

          // Set up sorting and pagination
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          // Handle error case
          console.error('Error fetching departments:', response.description);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openUpdateModal(element: any) {
    console.log(element)
    const modalRef: MdbModalRef<UpdateLeaveAssignComponent> = this.modalService.open(UpdateLeaveAssignComponent);
    modalRef.component.empId = element.id;
  }
}
