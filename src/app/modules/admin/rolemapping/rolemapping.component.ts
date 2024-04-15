import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../../model_class/employee';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { RoleMapping } from '../../../model_class/roleMapping';

@Component({
  selector: 'app-rolemapping',
  templateUrl: './rolemapping.component.html',
  styleUrl: './rolemapping.component.scss'
})
export class RolemappingComponent implements OnInit, AfterViewInit{

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  //-------------------------------------------------------------------------------

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = ['id', 'emp_name', 'department', 'role', 'annual_package','actions'];
  dataSource = new MatTableDataSource<RoleMapping>();


  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService.getAllEmployeesRoleAndSalary().subscribe((data) => {
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
