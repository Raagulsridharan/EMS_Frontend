import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../../model_class/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { RoleMapping } from '../../../model_class/roleMapping';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Department } from '../../../model_class/department';
import { Designation } from '../../../model_class/designation';
import { HttpStatusClass } from '../../../model_class/httpStatusClass';
import { UpdateRoleMappingComponent } from './update-role-mapping/update-role-mapping.component';
import { Payroll } from '../../../model_class/payroll';

@Component({
  selector: 'app-rolemapping',
  templateUrl: './rolemapping.component.html',
  styleUrl: './rolemapping.component.scss',
})
export class RolemappingComponent implements OnInit, AfterViewInit {
  formData!: FormGroup;
  departments: Department[] = [];
  employees: Employee[] = [];
  roles: Designation[] = [];
  selectedDepartmet!: number;
  selectedEmployee!: number;
  selectedRole!: number;
  selectedRoleSalaryPackage!: number;

  constructor(
    private modalService: MdbModalService,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchDepartments();
    this.fetchRoles();
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
      (departments) => {
        this.departments = departments.data || [];
        console.log(departments);
      },
      (error) => {
        console.log('Error fetching departments:', error);
      }
    );
  }

  fetchEmployeesByDepartment(departmentId: number): void {
    this.adminService
      .getEmployeesForRoleAssigningByDepartment(departmentId)
      .subscribe(
        (employees) => {
          this.employees = employees.data || [];
          console.log(employees);
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

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = [
    'id',
    'name',
    'dept',
    'role',
    'salaryPack',
    'actions',
  ];
  dataSource = new MatTableDataSource<RoleMapping>();

  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService
      .getAllEmployeesRoleAndSalary()
      .subscribe((response: HttpStatusClass) => {
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

  openUpdateModal(element: Payroll) {
    console.log(element);
    const modalRef: MdbModalRef<UpdateRoleMappingComponent> = this.modalService.open(UpdateRoleMappingComponent);
    modalRef.component.designationName = element.role;
    modalRef.component.dept = element.dept;
    modalRef.component.empId = element.id;
    modalRef.component.empName = element.emp_name;
  }
}
