import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from '../../../model_class/department';
import { Employee } from '../../../model_class/employee';
import { ActivatedRoute } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FilterOption } from '../../../model_class/filter-option';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  isAddEmployeeRoute: boolean = false;
  formData!: FormGroup;

  searchInput = new FormControl('');
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage: number;
  pageSize: number;
  totalItems: any;

  filterOptions: FilterOption;

  constructor(
    private modalService: MdbModalService,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private formBuilder: FormBuilder, 
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.route.url.subscribe((url) => {
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
    
    this.filterOptions = new FilterOption();
    this.pageSize = this.filterOptions.pageSize;
    this.currentPage = this.filterOptions.pageNo;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadData();

    this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilter()
    );

    //this.fetchTotalEmployees();

    this.dataSource.sort = this.sort;

  }

  get formControls() {
    return this.formData.controls;
  }

  fetchTotalEmployees() {
    this.adminService.getCountOfTotalEmployees().subscribe(
      (total) => {
        this.totalItems = total;
      },
      (error) => {
        console.error('Error fetching total customers count:', error);
      }
    );
  }

  //addEmployee(){}
  //----------------------------------------------

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'emp_name',
    'birthday',
    'gender',
    'mobile',
    'email',
    'department',
    'Action',
  ];
  dataSource = new MatTableDataSource<Employee>();

  loadData() {
    this.employeeService.filter(this.filterOptions).subscribe((response) => {
      if(response !==null || response != undefined){
      if (response.statusCode === 200) {
        this.dataSource.data = response.data;
        this.totalItems = response.data[0].totalCount;
      } else {
        console.error('Error fetching employees:', response.description);
      }
    }
    });
  }

  changePage(event: any) {
    this.filterOptions.pageNo = event.pageIndex + 1;
    this.filterOptions.pageSize = event.pageSize;
    this.loadData();
  }

  applyFilter() {
    this.filterOptions.searchKey = this.searchInput.value;
    this.filterOptions.sortBy = this.sort.active; // Get sorted column
    console.log(this.sort)
    //this.filterOptions.sortOrder = this.sort.direction; // Get sort order
    this.loadData();
  }

  openUpdateModal(element: Employee) {
    console.log(element);
    const modalRef: MdbModalRef<UpdateEmployeeComponent> = this.modalService.open(UpdateEmployeeComponent);
    modalRef.component.empId = element.id;
    modalRef.component.empName = element.emp_name;
    modalRef.component.deptName = element.department;
    modalRef.component.mobille = element.mobile;
    modalRef.component.address = element.address;
  }

  openDeleteModal(element: any) {
    console.log(element);
    const modalRef: MdbModalRef<DeleteEmployeeComponent> = this.modalService.open(DeleteEmployeeComponent, {
      modalClass: 'modal-dialog-centered modal-sm',
      animation: true,
      
    })
    modalRef.component.empId = element.id;
    modalRef.component.empName = element.emp_name;
    modalRef.component.deptName = element.department;
    modalRef.component.mobille = element.mobile;
    modalRef.component.address = element.address;
  }

  openViewModal(element: any) {
    console.log(element);
    const modalRef: MdbModalRef<ViewEmployeeComponent> = this.modalService.open(ViewEmployeeComponent, {
      modalClass: 'modal-dialog-centered',
      animation: true,
      
    })
    modalRef.component.empId = element.id;
    modalRef.component.empName = element.emp_name;
    modalRef.component.deptName = element.department;
    modalRef.component.mobile = element.mobile;
    modalRef.component.email = element.email;
    modalRef.component.birthday = element.birthday;
    modalRef.component.gender = element.gender;
    modalRef.component.address = element.address;
  }

}
