import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../../model_class/department';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpStatusClass } from '../../../model_class/httpStatusClass';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DepartmentService } from '../../../services/department.service';
import { FilterOption } from '../../../model_class/filter-option';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
})
export class DepartmentComponent implements OnInit {
  newDepartmentName: string = '';
  formData!: FormGroup;

  searchInput = new FormControl('');
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;

  filterOptions:FilterOption; 
  

  constructor(
    private modalService: MdbModalService,
    private adminService: AdminService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.filterOptions = new FilterOption();
    this.loadData();
    this.formData = this.formBuilder.group({
      newDepartmentName: ['', Validators.required]
    });

    this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilter()
    );
  }

  get formControls() {
    return this.formData.controls;
  }

  addDepartment() {
    const departmentName = this.formData.value.newDepartmentName;
    this.adminService.addDepartment(departmentName).subscribe(
      (response) => {
        console.log('Department added successfully:', response);
        this.formData.reset(); // Reset the form after successful addition
      },
      (error) => {
        alert('Error in adding department...!');
        console.error('Error adding department:', error);
        this.formData.reset();
      }
    );
  }

  //----------------------------------------------------

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'Action'];
  dataSource = new MatTableDataSource<Department>();

  loadData() {

    this.departmentService
      .filter(this.filterOptions)
      .subscribe((response) => {
        if (response.statusCode === 200) {
          this.dataSource.data = response.data;
          // this.totalItems = response.totalItems;
        } else {
          console.error('Error fetching departments:', response.description);
        }
      });
  }

  changePage(event: any) {
    this.filterOptions.pageNo = event.pageIndex;
    this.filterOptions.pageSize = event.pageSize;

    this.loadData();
  }

  applyFilter() {
    this.currentPage = 0; // Reset to first page when filter changes
    this.loadData();
  }

  // ngAfterViewInit() {
  //   // Fetch data asynchronously using the service
  //   this.adminService
  //     .getAllDepartments()
  //     .subscribe((response: HttpStatusClass) => {
  //       if (response.statusCode === 200) {
  //         // Assign the data to the dataSource
  //         console.log(response.data);
  //         this.dataSource.data = response.data;

  //         // Set up sorting and pagination
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       } else {
  //         // Handle error case
  //         console.error('Error fetching departments:', response.description);
  //       }
  //     });
  // }


  openUpdateModal(element: Department) {
    console.log(element)
    const modalRef: MdbModalRef<UpdateDepartmentComponent> = this.modalService.open(UpdateDepartmentComponent);
    modalRef.component.departmentId = element.id;
    modalRef.component.departmentName = element.name;
  }
  
}
