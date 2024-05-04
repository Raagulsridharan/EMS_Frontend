import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { ViewEmployeeLeavesComponent } from './view-employee-leaves/view-employee-leaves.component';
import { FilterOption } from '../../../model_class/filter-option';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LeaveService } from '../../../services/leave.service';

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

  searchInput = new FormControl('');
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage: number;
  pageSize: number;
  totalItems: any;

  filterOptions: FilterOption;

  constructor(
    private modalService: MdbModalService,
    private adminService: AdminService,
    private leaveService: LeaveService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchDepartments();
    this.fetchAllLeaveTypes();

    this.filterOptions = new FilterOption();
    this.pageSize = this.filterOptions.pageSize;
    this.currentPage = this.filterOptions.pageNo;
    this.loadData();
    this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilter());

    this.fetchLeaveAssign();
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
    this.employees.splice(0, this.employees.length);
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
      (leaves: HttpStatusClass) => {
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
    if (this.formData.valid) {
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
        .subscribe({
          next: (response) => {
            console.log('Response from backend:', response);
            this.formData.reset();
            this.loadData();
          },
          error: (error) => {
            console.error('Error from backend:', error);
            this.formData.reset();
          },
        });
    }
  }

  //----------------------------------------------------

  fetchLeaveAssign() {
    this.leaveService.getCountOfLeaveAssign().subscribe(
      (total) => {
        this.totalItems = total.data;
      },
      (error) => {
        console.error('Error fetching total departments count:', error);
      }
    );
  }

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

  loadData() {
    this.fetchLeaveAssign();
    this.leaveService.filter(this.filterOptions).subscribe((response) => {
      if (response.statusCode === 200) {
        this.dataSource.data = response.data;
        // this.totalItems = response.totalItems;
      } else {
        console.error('Error fetching Leaveassign:', response.description);
      }
    });
  }

  changePage(event: any) {
    this.filterOptions.pageNo = event.pageIndex + 1;
    this.filterOptions.pageSize = event.pageSize;
    this.loadData();
  }

  applyFilter() {
    // this.currentPage = 0;
    this.filterOptions.searchKey = this.searchInput.value;
    this.loadData();
  }

  openUpdateModal(element: any) {
    console.log(element);
    const modalRef: MdbModalRef<UpdateLeaveAssignComponent> =
      this.modalService.open(UpdateLeaveAssignComponent);
    modalRef.component.empId = element[0];
  }

  openViewModal(element: any) {
    console.log(element);
    const modalRef: MdbModalRef<ViewEmployeeLeavesComponent> =
      this.modalService.open(ViewEmployeeLeavesComponent, {
        modalClass: 'modal-dialog-centered',
        animation: true,
      });
    modalRef.component.empId = element[0];
  }
}
