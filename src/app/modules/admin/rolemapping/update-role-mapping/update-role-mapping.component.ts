import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';
import { Designation } from '../../../../model_class/designation';
import { DesignationService } from '../../../../services/designation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-role-mapping',
  templateUrl: './update-role-mapping.component.html',
  styleUrl: './update-role-mapping.component.scss',
})
export class UpdateRoleMappingComponent {
  @Input() designationName!: string;
  @Input() empId!: number;
  @Input() empName!: string;
  @Input() dept!: string;
  @Input() deptId!: number;

  formData!: FormGroup;
  designations: Designation[] = [];

  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private designationService: DesignationService,
    public modalRef: MdbModalRef<UpdateRoleMappingComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchRoles();
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      designation: ['', Validators.required],
      updateSalaryPackage: ['', Validators.required],
    });
  }

  fetchRoles(): void {
    this.designationService.getRolesByDepartment(this.deptId).subscribe({
      next: (response) => {
        this.designations = response || [];
        console.log(response);
      },
      error: (error) => {
        console.log('Error fetching employees:', error.error.message);
      },
    });
  }

  isDesignationDisabled(designationName: any): boolean {
    return designationName === this.designationName;
  }

  updateRoleMapping(): void {
    if (this.formData.valid) {
      this.adminService
      .updateRoleAndSalaryForEmployee(
        this.empId,
        this.formData.value.designation,
        this.formData.value.updateSalaryPackage
      )
      .subscribe(
        (response) => {
          console.log('Role&Salary updated successfully:', response);
          this.formData.reset();
          this.modalRef.close();
          window.location.reload();
        },
        (error) => {
          alert('Error in updating Role&Salary...!');
          console.error('Error updating Role&Salary:', error);
          this.formData.reset();
        }
      );
    }
    else{
      this.toastrService.warning('Enter Valid values!')
    }
  }
}
