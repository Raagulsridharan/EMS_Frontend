import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  isAddEmployeeRoute: boolean = false;
  formData!: FormGroup;

  constructor(
    private modalService: MdbModalService,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private formBuilder: FormBuilder
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
  }

  get formControls() {
    return this.formData.controls;
  }

  //addEmployee(){}
  //----------------------------------------------

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = [
    'id',
    'emp_name',
    'birthday',
    'gender',
    'mobile',
    'email',
    'department',
    'Action',
  ];
  dataSource = new MatTableDataSource<Employee>();

  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService.getAllEmployees().subscribe((response) => {
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
