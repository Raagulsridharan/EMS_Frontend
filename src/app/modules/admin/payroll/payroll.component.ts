import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Payroll } from '../../../model_class/payroll';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpStatusClass } from '../../../model_class/httpStatusClass';
import { Department } from '../../../model_class/department';
import { Employee } from '../../../model_class/employee';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent implements OnInit, AfterViewInit{

  formData!: FormGroup;
  departments: Department[] = [];
  employees: Employee[] = [];

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(){
    this.initForm();
    this.fetchDepartments();
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

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'dept', 'role', 'basic_sal_month','tax_reduction_month','net_sal_month','history'];
  dataSource = new MatTableDataSource<Payroll>();


  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService.getAllEmployeesPayroll().subscribe((response: HttpStatusClass) => {
     // Assign the data to the dataSource
     console.log(response);
     
     this.dataSource.data = response.data;

     // Set up sorting and pagination
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   });
 }

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }

}
