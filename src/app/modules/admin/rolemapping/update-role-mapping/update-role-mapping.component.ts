import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';
import { Designation } from '../../../../model_class/designation';

@Component({
  selector: 'app-update-role-mapping',
  templateUrl: './update-role-mapping.component.html',
  styleUrl: './update-role-mapping.component.scss'
})
export class UpdateRoleMappingComponent {
  
  @Input() designationName!: string;
  @Input() empId!: number;
  @Input() empName!: string;
  @Input() dept!: string;

  formData!: FormGroup;
  designations: Designation[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<UpdateRoleMappingComponent>
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    this.fetchRoles();    
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      designation: ['', Validators.required],
      updateSalaryPackage: ['',Validators.required]
    });
  }

  fetchRoles(): void {
    this.adminService.getAllDesignation().subscribe(
      (designation) => {
        this.designations = designation.data || [];
        console.log(designation);
      },
      (error) => {
        console.log('Error fetching designation:', error);
      }
    );
  }

  isDesignationDisabled(designationName: any): boolean {
    return designationName === this.designationName;
  }

  updateRoleMapping(): void{
    console.log(this.dept,this.designationName,this.empId,this.empName)
    console.log(this.formData.value.designation,this.formData.value.updateSalaryPackage);
    this.adminService
      .updateRoleAndSalaryForEmployee(this.empId, this.formData.value.designation, this.formData.value.updateSalaryPackage)
      .subscribe(
        (response) => {
          console.log('Role&Salary updated successfully:', response);
          this.formData.reset(); // Reset the form after successful addition
        },
        (error) => {
          alert('Error in updating Role&Salary...!');
          console.error('Error updating Role&Salary:', error);
          this.formData.reset();
        }
      );
  }

}