import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../../model_class/employee';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { RoleMapping } from '../../../model_class/roleMapping';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Department } from '../../../model_class/department';
import { Designation } from '../../../model_class/designation';
import { HttpStatusClass } from '../../../model_class/httpStatusClass';
import { UpdateRoleMappingComponent } from './update-role-mapping/update-role-mapping.component';
import { Payroll } from '../../../model_class/payroll';
import { FilterOption } from '../../../model_class/filter-option';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-rolemapping',
  templateUrl: './rolemapping.component.html',
  styleUrl: './rolemapping.component.scss',
})
export class RolemappingComponent implements OnInit{
  formData: FormGroup = new FormGroup({
    departmentId: new FormControl(''),
    employeeId: new FormControl(''),
    roleId: new FormControl(''),
    salary: new FormControl('')
  });
  departments: Department[] = [];
  employees: Employee[] = [];
  roles: Designation[] = [];
  selectedDepartmet!: number;
  selectedEmployee!: number;
  selectedRole!: number;
  selectedRoleSalaryPackage!: number;

  empId: number;

  isEmployeeSelectDisabled = true;

  searchInput = new FormControl('');
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage: number;
  pageSize: number;
  totalItems: any;

  filterOptions: FilterOption;

  constructor(
    private modalService: MdbModalService,
    private adminService: AdminService,
    private roleService: RoleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchDepartments();
    this.fetchRoles();

    this.filterOptions = new FilterOption();
    this.pageSize = this.filterOptions.pageSize;
    this.currentPage = this.filterOptions.pageNo;
    this.loadData();

    this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilter()
    );

    this.fetchTotalEmpRolesalary();
  }

  get formControls() {
    return this.formData.controls;
  }

  get departmentId() {
    return this.formData.get('departmentId');
  }

  get employeeId() {
    return this.formData.get('employeeId')!;
  }

  get roleId() {
    return this.formData.get('roleId')!;
  }

  get salary() {
    return this.formData.get('salary')!;
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      departmentId: ['', Validators.required],
      employeeId: ['', Validators.required],
      roleId: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  fetchDepartments(): void {
    this.adminService.getAllDepartments().subscribe(
      (departments:HttpStatusClass) => {
        this.departments = departments.data ;
        console.log(departments);
      },
      (error) => {
        console.log('Error fetching departments:', error);
      }
    );
  }

  fetchEmployeesByDepartment(departmentId: number): void {

    this.employees.splice(0, this.employees.length);
    this.adminService
      .getEmployeesForRoleAssigningByDepartment(departmentId)
      .subscribe(
        (response) => {
          this.employees = response.data || [];
          console.log(response);
          this.isEmployeeSelectDisabled = this.employees.length === 0;
          console.log('isEmployeeSelectDisabled:', this.isEmployeeSelectDisabled);
        },
        (error) => {
          console.log('Error fetching employees:', error);
        }
      );
  }

  fetchRoles(): void {
    this.adminService.getAllDesignation().subscribe(
      (designation) => {
        this.roles = designation.data || [];
        console.log(designation);
      },
      (error) => {
        console.log('Error fetching designation:', error);
      }
    );
  }

  submitForm(): void {
    this.isCompetencyFormValid();
    if(this.formData.valid){
      console.log(this.formData);
    const empId: number = this.formData.value.employeeId;
    const roleId: number = this.formData.value.roleId;
    const enteredSalary = this.formData.value.salary;
    this.adminService
      .addRoleAndSalaryForEmployee(empId, roleId, enteredSalary)
      .subscribe(
        (response) => {
          console.log('Role&Salary added successfully:', response);
          this.formData.reset(); // Reset the form after successful addition
        },
        (error) => {
          alert('Error in adding Role&Salary...!');
          console.error('Error adding Role&Salary:', error);
          this.formData.reset();
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

  updateSalaryPlaceholder(): void {
    const roleId = this.formData.get('roleId')?.value;
    const selectedRole = this.roles.find((role) => role.id === roleId);
    if (selectedRole) {
      // Set the salary value based on the selected role
      this.formData.get('salary')?.setValue(selectedRole.salary_package);
    }
  }

  getSalaryPlaceholder(): string {
    const selectedRoleId = this.formData.value.roleId;
    const selectedRole = this.roles.find((role) => role.id === selectedRoleId);
    return selectedRole
      ? `Salary Package: ${selectedRole.salary_package}`
      : 'Salary Package.';
  }

  //-------------------------------------------------------------------------------

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'name',
    'dept',
    'role',
    'salaryPack',
    'actions',
  ];
  dataSource = new MatTableDataSource<RoleMapping>();

  fetchTotalEmpRolesalary() {
    this.roleService.getCountOfEmpRoleSalary().subscribe(
      (total) => {
        this.totalItems = total.data;
      },
      (error) => {
        console.error('Error fetching total departments count:', error);
      }
    );
  }

  loadData() {
    this.roleService.filter(this.filterOptions).subscribe((response) => {
      if (response.statusCode === 200) {
        this.dataSource.data = response.data;
        // this.totalItems = response.totalItems;
      } else {
        console.error('Error fetching EmpRoleSalary:', response.description);
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

  openUpdateModal(element: Payroll) {
    console.log(element);
    const modalRef: MdbModalRef<UpdateRoleMappingComponent> = this.modalService.open(UpdateRoleMappingComponent);
    modalRef.component.designationName = element.role;
    modalRef.component.dept = element.dept;
    modalRef.component.empId = element.empId;
    modalRef.component.empName = element.emp_name;
  }
}
