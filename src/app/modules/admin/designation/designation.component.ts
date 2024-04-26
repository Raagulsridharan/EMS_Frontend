import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Designation } from '../../../model_class/designation';
import { MatTableDataSource } from '@angular/material/table';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UpdateDesignationComponent } from './update-designation/update-designation.component';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.scss',
})
export class DesignationComponent implements OnInit, AfterViewInit {
  formData: FormGroup = new FormGroup({
    newDesignationName: new FormControl(''),
    salary_package: new FormControl(''),
  });

  // formData!: FormGroup;

  constructor(
    private modalService: MdbModalService,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formData = this.formBuilder.group({
      newDesignationName: ['', [Validators.required]],
      salary_package: ['', [Validators.required]],
    });
  }

  get newDesignationName() {
    return this.formData.get('newDesignationName')!;
  }

  get salary_package() {
    return this.formData.get('salary_package')!;
  }

  get formControls() {
    return this.formData.controls;
  }

  addDesignation() {
    this.isCompetencyFormValid();
    if (this.formData.valid) {
      const designation = this.formData.value.newDesignationName;
      const salary_package = this.formData.value.salary_package;
      this.adminService.addDesignation(designation, salary_package).subscribe(
        (response) => {
          console.log('Designation added successfully:', response);
          this.formData.reset(); // Reset the form after successful addition
          this.ngAfterViewInit();
        },
        (error) => {
          //alert('Error in adding designation...!')
          console.error('Error adding designation:', error);
          //this.formData.reset();
        }
      );
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

  //--------------------------------------------------------------

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = ['id', 'role', 'salary_package', 'Action'];
  dataSource = new MatTableDataSource<Designation>();

  @ViewChild('collapse') collapse!: MdbCollapseDirective;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.collapse.show();
    }, 2000);

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

  openUpdateModal(element: Designation) {
    console.log(element);
    const modalRef: MdbModalRef<UpdateDesignationComponent> =
      this.modalService.open(UpdateDesignationComponent);
    modalRef.component.designationId = element.id;
    modalRef.component.designationName = element.role;
    modalRef.component.salaryPackage = element.salary_package;
  }
}
