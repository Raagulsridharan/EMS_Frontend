import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeHasLeave } from '../../../model_class/employeeHasLeave';
import { EmployeeService } from '../../../services/employee.service';
import { HttpStatusClass } from '../../../model_class/httpStatusClass';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from '../../../model_class/payment';
import { AdminService } from '../../../services/admin.service';
import { Payroll } from '../../../model_class/payroll';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.scss'
})

export class SalaryComponent implements OnInit{

  empId:any;
  employeeDetail: EmployeeHasLeave;
  salaryDetail: Payroll;

  empName: string;

  constructor(
    private adminService: AdminService,
    private employeeService:EmployeeService
  ){}
  ngOnInit(): void {
    this.empId = localStorage.getItem('employeeId');
    this.fetchRoleCardDetails();
    this.fetchSalaryDetails();
  }

  fetchRoleCardDetails(){
    this.employeeService.employeeDetailsCard(this.empId).subscribe(
      (response:HttpStatusClass) =>{
        console.log('Employee Card detail'+response);
        this.employeeDetail = response.data;
      }
    );
  }

  fetchSalaryDetails(){
    this.employeeService.salaryDetailCard(this.empId).subscribe(
      (response:HttpStatusClass) =>{
        console.log('Salary Card detail'+response);
        this.salaryDetail = response.data;
      }
    );
  }

  //-------------------------
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = ['paid_salary','description','month','status','payslip'];
  dataSource = new MatTableDataSource<Payment>();

  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService.getEmployeesPayroll(this.empId).subscribe((response: HttpStatusClass) => {
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

 exportPDF(payrollId:number){
  this.adminService.exportPDF(payrollId);
 }

}
