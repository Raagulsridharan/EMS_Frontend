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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leaveassign',
  templateUrl: './leaveassign.component.html',
  styleUrl: './leaveassign.component.scss',
})
export class LeaveassignComponent implements OnInit {
  formData: FormGroup = new FormGroup({
    departmentId: new FormControl(''),
    employeeId: new FormControl('')
  });
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
    private toastr: ToastrService,
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

    //this.fetchLeaveAssign();
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      departmentId: ['', Validators.required],
      employeeId: ['', Validators.required],
    });
  }

  get formControls() {
    return this.formData.controls;
  }

  get departmentId() {
    return this.formData.get('departmentId')!;
  }

  get employeeId() {
    return this.formData.get('employeeId')!;
  }

  fetchDepartments(): void {
    this.adminService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments.data || [];
      },
      error: (error) => {
        //console.log('Error fetching departments:', error);
      },
    });
  }

  fetchEmployeesByDepartment(departmentId: number): void {
    this.employees.splice(0, this.employees.length);
    this.adminService
      .getEmployeesForLeaveAssigningByDepartment(departmentId)
      .subscribe({
        next: (employees) => {
          this.employees = employees.data || [];
        },
        error: (error) => {
          //console.log('Error fetching employees:', error);
        },
      });
  }

  fetchAllLeaveTypes(): void {
    this.adminService.getAllLeaveType().subscribe({
      next:(leaves) => {
        this.leaveTypes = leaves.data || [];
        this.initLeaveTypeFormControls();
      },
      error:(error) => {
        //console.log('Error fetching departments:', error);
      }
    });
  }

  initLeaveTypeFormControls(): void {
    this.leaveTypes.forEach((leaveType, index) => {
      this.formData.addControl(
        `noOfDays${leaveType.id}`,
        this.formBuilder.control('', Validators.required)
      );
    });
  }

  submitForm(): void {
    this.isCompetencyFormValid();
    if (this.formData.valid) {
      const empId: number = this.formData.value.employeeId;
      this.leaveAssignList = [];
      this.leaveTypes.forEach((leaveType, index) => {
        const noOfdays = this.formData.get(`noOfDays${leaveType.id}`)?.value;
        if (noOfdays !== null) {
          this.leaveAssignList.push({
            leaveId: leaveType.id,
            noOfdays: noOfdays,
          });
        }
      });
      this.adminService
        .assignLeaveForEmployee(empId, this.leaveAssignList)
        .subscribe({
          next: (response) => {
            this.formData.reset();
            this.loadData();
            this.toastr.success('Leave Assigned')
          },
          error: (error) => {
            this.formData.reset();
          },
        });
    }else{
      this.toastr.warning('Please enter all filds!!!')
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

  //----------------------------------------------------

  fetchLeaveAssign() {
    this.leaveService.getCountOfLeaveAssign().subscribe(
      (total) => {
        this.totalItems = total.data;
      },
      (error) => {
        //console.error('Error fetching total departments count:', error);
      }
    );
  }

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = [
    'empName',
    'department',
    'role',
    'activatedOn',
    'actions',
  ];
  dataSource = new MatTableDataSource<EmployeeHasLeave>();

  loadData() {
    // this.fetchLeaveAssign();
    this.leaveService.filter(this.filterOptions).subscribe((response) => {
      if (response.statusCode === 200) {
        this.dataSource.data = response.data;
        this.totalItems = response.data[0].totalCount;
      } else {
        //console.error('Error fetching Leaveassign:', response.description);
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
    const modalRef: MdbModalRef<UpdateLeaveAssignComponent> =
      this.modalService.open(UpdateLeaveAssignComponent);
    modalRef.component.empId = element.id;
  }

  openViewModal(element: any) {
   const modalRef: MdbModalRef<ViewEmployeeLeavesComponent> =
      this.modalService.open(ViewEmployeeLeavesComponent, {
        modalClass: 'modal-dialog-centered',
        animation: true,
      });
    modalRef.component.empId = element.id;
  }
}
