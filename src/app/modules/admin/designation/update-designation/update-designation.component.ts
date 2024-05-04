import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';
import { Department } from '../../../../model_class/department';
import { Designation } from '../../../../model_class/designation';
import { ToastrService } from 'ngx-toastr';
import { DesignationComponent } from '../designation.component';

@Component({
  selector: 'app-update-designation',
  templateUrl: './update-designation.component.html',
  styleUrl: './update-designation.component.scss',
})
export class UpdateDesignationComponent implements OnInit {
  @Input() designationId!: number;
  @Input() designationName!: string;
  @Input() salaryPackage!: string;
  @Input() department: Department;
  @Input() departmentId: number;

  @ViewChild(DesignationComponent) designationComponent!: DesignationComponent;

  defaultRole: string = '';
  defualtPackage: string = '';
  formData: FormGroup;
  departments: Department[] = [];
  desingnationData: Designation = new Designation();

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<UpdateDesignationComponent>
  ) {}

  ngOnInit() {
    this.defaultRole = this.designationName;
    this.defualtPackage = this.salaryPackage;
    this.formData = this.formBuilder.group({
      updateDesignation: [this.defaultRole, [Validators.required]],
      updateSalaryPackage: [this.defualtPackage, [Validators.required]],
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
  isDepartmentDisabled(departmentName: any): boolean {
    return departmentName === this.department.name;
  }

  onInput1(event: Event) {
    this.defaultRole = (event.target as HTMLInputElement).value;
  }
  onInput2(event: Event) {
    this.defualtPackage = (event.target as HTMLInputElement).value;
  }

  updateDesignation(): void {
    this.desingnationData.role = this.formData.value.updateDesignation;
    this.desingnationData.salary_package =
      this.formData.value.updateSalaryPackage;
    this.desingnationData.departmentId = this.departmentId;
    this.adminService
      .updateDesignation(this.designationId, this.desingnationData)
      .subscribe({
        next: (response: Designation) => {
          //console.log('Designation updated successfully:', response);
          this.formData.reset();
          this.modalRef.close();
          
          //window.location.reload();
          //this.designationComponent.ngAfterViewInit();
          this.toastr.success('Designation Updated');
        },
        error: (error) => {
          //alert('Error in updating Designation...!');
          console.error('Error updating Designation:', error);
          //this.formData.reset();
          this.toastr.error('Duplicate Entry !');
        },
      });
  }
}
