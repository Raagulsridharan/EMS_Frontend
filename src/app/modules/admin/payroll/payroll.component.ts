import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Payroll } from '../../../model_class/payroll';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpStatusClass } from '../../../model_class/httpStatusClass';
import { Department } from '../../../model_class/department';
import { Employee } from '../../../model_class/employee';
import { FilterOption } from '../../../model_class/filter-option';
import { SalaryService } from '../../../services/salary.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss',
})
export class PayrollComponent implements OnInit {
  formData: FormGroup = new FormGroup({
    departmentId: new FormControl(''),
    employeeId: new FormControl(''),
  });

  departments: Department[] = [];
  employees: Employee[] = [];

  searchInput = new FormControl('');
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage: number;
  pageSize: number;
  totalItems: any;

  filterOptions: FilterOption;

  constructor(
    private toastr: ToastrService,
    private adminService: AdminService,
    private salaryService: SalaryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.fetchDepartments();

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
    });
  }

  get formControls() {
    return this.formData.controls;
  }

  get departmentId() {
    return this.formData.get('departmentId');
  }

  get employeeId() {
    return this.formData.get('employeeId')!;
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
      .getEmployeesForPayrollAssigningByDepartment(departmentId)
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

  submitForm(): void {
    this.isCompetencyFormValid();
    if (this.formData.valid) {
      const empId: number = this.formData.value.employeeId;
      this.adminService.createPayrollForEmployee(empId).subscribe({
        next:(response) => {
          this.formData.reset();
          this.toastr.success('Payroll Added !')
          this.loadData();
        },
        error:(error) => {
          this.formData.reset();
        }
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

  //----------------------------------

  fetchLeaveAssign() {
    this.salaryService.getCountOfPayroll().subscribe(
      (total) => {
        this.totalItems = total.data;
      },
      (error) => {
        console.error('Error fetching total payroll count:', error);
      }
    );
  }

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = [
    'name',
    'dept',
    'role',
    'basic_sal_month',
    'tax_reduction_month',
    'net_sal_month',
    'history',
  ];
  dataSource = new MatTableDataSource<Payroll>();

  loadData() {
    // this.fetchLeaveAssign();
    this.salaryService
      .getPayrollData(this.filterOptions)
      .subscribe((response) => {
        if (response.statusCode === 200) {
          this.dataSource.data = response.data;
          // this.totalItems = response.totalItems;
        } else {
          console.error('Error fetching Payroll:', response.description);
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
}
