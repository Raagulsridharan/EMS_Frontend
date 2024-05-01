import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent implements OnInit{

  formData!: FormGroup;
  departments: Department[] = [];
  employees: Employee[] = [];

  searchInput = new FormControl('');
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage: number;
  pageSize: number;
  totalItems: any;

  filterOptions: FilterOption;

  constructor(
    private adminService: AdminService,
    private salaryService: SalaryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(){
    this.initForm();
    this.fetchDepartments();

    this.filterOptions = new FilterOption();
    this.pageSize = this.filterOptions.pageSize;
    this.currentPage = this.filterOptions.pageNo;
    this.loadData();
    this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilter()
    );

    this.fetchLeaveAssign();
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      departmentId: ['', Validators.required],
      employeeId: ['', Validators.required]
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
    this.adminService.getEmployeesForPayrollAssigningByDepartment(departmentId).subscribe(
      (employees) =>{
        this.employees = employees.data || [];
        console.log(employees);
      },
      (error) =>{
        console.log('Error fetching employees:', error);
      }
    );
  }

  submitForm(): void{
    console.log(this.formData);
    const empId: number = this.formData.value.employeeId;
    this.adminService.createPayrollForEmployee(empId).subscribe(
      response => {
        console.log('Payroll added successfully:', response);
        this.formData.reset(); // Reset the form after successful addition
      },
      error => {
        alert('Error in adding Payroll...!')
        console.error('Error adding Payroll:', error);
        this.formData.reset();
      }  
    );
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

  displayedColumns: string[] = ['id', 'name', 'dept', 'role', 'basic_sal_month','tax_reduction_month','net_sal_month','history'];
  dataSource = new MatTableDataSource<Payroll>();


  loadData() {
    // this.fetchLeaveAssign();
    this.salaryService.getPayrollData(this.filterOptions).subscribe((response) => {
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
