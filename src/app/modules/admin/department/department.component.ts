import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Department } from '../../../model_class/department';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpStatusClass } from '../../../model_class/httpStatusClass';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent implements OnInit, AfterViewInit{

  newDepartmentName: string = '';
  formData!: FormGroup;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      newDepartmentName: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.formData.controls;
  }
  
  addDepartment() {
    const departmentName = this.formData.value.newDepartmentName;
    this.adminService.addDepartment(departmentName).subscribe(
      response => {
        console.log('Department added successfully:', response);
        this.formData.reset(); // Reset the form after successful addition
      },
      error => {
        alert('Error in adding department...!')
        console.error('Error adding department:', error);
        this.formData.reset();
      }
    );
  }

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = ['id', 'name','Action'];
  dataSource = new MatTableDataSource<Department>();


  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService.getAllDepartments().subscribe((response: HttpStatusClass) => {
      if (response.statusCode === 200) {
        // Assign the data to the dataSource
        console.log(response.data);
        this.dataSource.data = response.data;
        
        // Set up sorting and pagination
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        // Handle error case
        console.error('Error fetching departments:', response.description);
      }
   });
 }

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }
  
}
