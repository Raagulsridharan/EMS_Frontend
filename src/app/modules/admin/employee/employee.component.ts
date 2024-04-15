import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from '../../../model_class/Department';
import { Employee } from '../../../model_class/employee';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {

  isAddEmployeeRoute: boolean = false;
  formData!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.isAddEmployeeRoute = url.length > 0 && url[0].path === 'addEmployee';
    });
    this.formData = this.formBuilder.group({
      emp_name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      department: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.formData.controls;
  }

  //addEmployee(){}
  //----------------------------------------------

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = ['id', 'emp_name', 'gender', 'mobile', 'email', 'address', 'department','Action'];
  dataSource = new MatTableDataSource<Employee>();


  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService.getAllEmployees().subscribe((data) => {
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
