import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
})
export class DepartmentComponent implements OnInit {
  formData: FormGroup = new FormGroup({
    newDepartmentName: new FormControl(''),
  });

  searchInput = new FormControl('');
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage: number;
  pageSize: number;
  totalItems: any;

  filterOptions: FilterOption;

  constructor(
    private toastrService: ToastrService,
    private modalService: MdbModalService,
    private adminService: AdminService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.filterOptions = new FilterOption();
    this.pageSize = this.filterOptions.pageSize;
    this.currentPage = this.filterOptions.pageNo;
    this.loadData();

    this.formData = this.formBuilder.group({
      newDepartmentName: ['', Validators.required],
    });

    this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilter());

    //this.fetchTotalDepartment();
  }

  get formControls() {
    return this.formData.controls;
  }

  get newDepartmentName() {
    return this.formData.get('newDepartmentName')!;
  }

  fetchTotalDepartment() {
    this.adminService.getCountOfTotalDepartments().subscribe(
      (total) => {
        this.totalItems = total.data;
      },
      (error) => {
        console.error('Error fetching total departments count:', error);
      }
    );
  }

  addDepartment() {
    this.isCompetencyFormValid();
    if (this.formData.valid) {
      const departmentName = this.formData.value.newDepartmentName;
      this.adminService.addDepartment(departmentName).subscribe({
        next: (response) => {
          this.formData.reset();
          this.toastrService.success('Added Successfully');
        },
        error: (error) => {
          this.formData.reset();
          if (error.error.statusCode == 409) {
            this.toastrService.error(error.error.description);
          } else {
            this.toastrService.error('Failure while saving department');
          }
        },
      });
    }
  }

  private isCompetencyFormValid() {
    if (this.formData.invalid) {
      for (const control of Object.keys(this.formData.controls)) {
        this.formData.controls[control].markAsTouched();
      }
      this.scrollToError();
      return false;
    } else {
      return true;
    }
  }

  scrollToValidationMessage(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  scrollToError(): void {
    const firstElementWithError: HTMLElement = document.querySelector(
      '.ng-invalid[formControlName]'
    );
    this.scrollToValidationMessage(firstElementWithError);
  }

  //----------------------------------------------------

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['name', 'Action'];
  dataSource = new MatTableDataSource<Department>();

  loadData() {
    this.departmentService.filter(this.filterOptions).subscribe((response) => {
      if (response.statusCode === 200) {
        this.dataSource.data = response.data;
        this.totalItems = response.data[0].totalCount;
      } else {
        console.error('Error fetching departments:', response.description);
      }
    });
  }

  changePage(event: any) {
    this.filterOptions.pageNo = event.pageIndex + 1;
    this.filterOptions.pageSize = event.pageSize;
    this.loadData();
  }

  applyFilter() {
    // this.currentPage = 0;
    this.filterOptions.searchKey = this.searchInput.value;
    this.loadData();
  }

  openUpdateModal(element: Department) {
    console.log(element);
    const modalRef: MdbModalRef<UpdateDepartmentComponent> =
      this.modalService.open(UpdateDepartmentComponent);
    modalRef.component.departmentId = element.id;
    modalRef.component.departmentName = element.name;
  }
}
