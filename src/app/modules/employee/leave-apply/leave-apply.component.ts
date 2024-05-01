import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { LeaveType } from '../../../model_class/leaveType';
import { HttpStatusClass } from '../../../model_class/httpStatusClass';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { LeaveService } from '../../../services/leave.service';
import { LeaveApplied } from '../../../model_class/leaveApplied';
import { FilterOption } from '../../../model_class/filter-option';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from '../../../model_class/department';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UpdateLeave } from '../../../model_class/updateLeave';
import { ViewEmployeeLeavesComponent } from '../../admin/leaveassign/view-employee-leaves/view-employee-leaves.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrl: './leave-apply.component.scss',
})
export class LeaveApplyComponent implements OnInit {
  leaveForm: FormGroup = new FormGroup({
    leaveType: new FormControl(''),
    note: new FormControl(''),
    departmentId: new FormControl(''),
    toDate: new FormControl('')
  });

  leaveTypes: LeaveType[] = [];
  empId!: string;
  leaveApplied: LeaveApplied;

  constructor(
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.empId = localStorage.getItem('employeeId');
    this.fetchAllLeaveTypes();
    this.leaveForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      note: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });


    this.filterOptions = new FilterOption();
    this.pageSize = this.filterOptions.pageSize;
    this.currentPage = this.filterOptions.pageNo;
    this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilter()
    );
    this.fetchTotalLeaveHistoryCount();
    this.loadData();

    this.fetchEmployeeLeaves();
  }

  get formControls() {
    return this.leaveForm.controls;
  }

  get leaveType() {
    return this.leaveForm.get('leaveType');
  }

  get note() {
    return this.leaveForm.get('note')!;
  }

  get fromDate() {
    return this.leaveForm.get('fromDate')!;
  }

  get toDate() {
    return this.leaveForm.get('toDate')!;
  }

  fetchAllLeaveTypes(): void {
    this.adminService.getAllLeaveType().subscribe(
      (leaves: HttpStatusClass) => {
        this.leaveTypes = leaves.data || [];
        console.log(leaves);
      },
      (error) => {
        console.log('Error fetching all leave types:', error);
      }
    );
  }

  onSubmit(): void {
    this.isCompetencyFormValid();
    if (this.leaveForm.valid) {
      console.log('Leave application submitted:', this.empId);
      this.leaveApplied = this.leaveForm.value;
      this.leaveService
        .applyingLeave(Number(this.empId), this.leaveApplied)
        .subscribe((response) => {
          console.log(response);
        });
      this.leaveForm.reset();
    } else {
      //alert('please fill form');
    }
   
  }

  private isCompetencyFormValid() {
    if (this.leaveForm.invalid) {
      for (const control of Object.keys(this.leaveForm.controls)) {
        this.leaveForm.controls[control].markAsTouched();
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

  //----------------------------------------------

  searchInput = new FormControl('');
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage: number;
  pageSize: number;
  totalItems: any;

  filterOptions: FilterOption;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'name',
    'dept',
    'leaveType',
    'fromDate',
    'toDate',
    'note',
    'submittedOn',
    'Status',
  ];
  dataSource = new MatTableDataSource<LeaveApplied>();

  ngAfterViewInit() {
    // this.filterOptions = new FilterOption();
    // this.pageSize = this.filterOptions.pageSize;
    // this.currentPage = this.filterOptions.pageNo;
    // this.searchInput.valueChanges
    //   .pipe(debounceTime(300), distinctUntilChanged())
    //   .subscribe(() => this.applyFilter()
    // );
    // this.fetchTotalLeaveHistoryCount();
    // this.loadData();
  }

  fetchTotalLeaveHistoryCount() {
    this.leaveService.getEmployeeLeaveHistoryCount(this.empId).subscribe(
      (total) => {
        this.totalItems = total.data;
      },
      (error) => {
        console.error('Error fetching total employee leave count:', error);
      }
    );
  }

  loadData() {
    this.leaveService
      .getEmployeeLeaveHistory(Number(this.empId))
      .subscribe((response) => {
        if (response.statusCode === 200) {
          this.dataSource.data = response.data;
          // this.totalItems = response.totalItems;
        } else {
          console.error('Error fetching count of employee leave history:', response.description);
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

  //-----------------------------------------
  leaves!: UpdateLeave[];
  
  fetchEmployeeLeaves() {
    this.adminService
      .gettingEmployeeLeaves(this.empId)
      .subscribe((response: HttpStatusClass) => {
        if (response.statusCode === 200) {
          console.log(response.data);
          this.leaves = response.data;
        } else {
          console.error('Error fetching leaves of employees:', response.description);
        }
      });
  }
}
