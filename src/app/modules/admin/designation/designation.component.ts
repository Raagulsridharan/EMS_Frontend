import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Designation } from '../../../model_class/designation';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.scss'
})
export class DesignationComponent implements OnInit, AfterViewInit{

  newDesignationName: string = '';
  salary_package: string = '';
  formData!: FormGroup;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      newDesignationName: ['', [Validators.required]],
      salary_package: ['',[Validators.required]]
    });
  }

  get formControls() {
    return this.formData.controls;
  }

  addDesignation() {
    const designation = this.formData.value.newDesignationName;
    const salary_package = this.formData.value.salary_package;
    this.adminService.addDesignation(designation,salary_package).subscribe(
      response => {
        console.log('Designation added successfully:', response);
        this.formData.reset(); // Reset the form after successful addition
      },
      error => {
        alert('Error in adding designation...!')
        console.error('Error adding designation:', error);
        this.formData.reset();
      }
    );
  }

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = ['id', 'role', 'salary_package','Action'];
  dataSource = new MatTableDataSource<Designation>();

  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService.getAllDesignation().subscribe((response) => {
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
