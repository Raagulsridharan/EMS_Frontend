import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Payroll } from '../../../model_class/payroll';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent implements OnInit, AfterViewInit{

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(){
    // throw new Error('Method not implemented.');
  }

  //----------------------------------

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'dept', 'role', 'basic_sal_month','tax_reduction_month','net_sal_month','history'];
  dataSource = new MatTableDataSource<Payroll>();


  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService.getAllEmployeesPayroll().subscribe((data) => {
     // Assign the data to the dataSource
     console.log(data);
     
     this.dataSource.data = data;

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
