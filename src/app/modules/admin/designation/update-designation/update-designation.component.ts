import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-update-designation',
  templateUrl: './update-designation.component.html',
  styleUrl: './update-designation.component.scss'
})
export class UpdateDesignationComponent implements OnInit{

  @Input() designationId!: number;
  @Input() designationName!: string;
  @Input() salaryPackage!: string;

  defaultRole: string = '';
  defualtPackage: string = '';
  formData: any;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<UpdateDesignationComponent>
  ) {}

  ngOnInit() {
    this.defaultRole = this.designationName;
    this.defualtPackage = this.salaryPackage;
    this.formData = this.formBuilder.group({
      updateDesignation: [this.defaultRole, [Validators.required]],
      updateSalaryPackage: [this.defualtPackage,[Validators.required]]
    });
  }

  onInput1(event: Event) {
    this.defaultRole =    (event.target as HTMLInputElement).value;
  }
  onInput2(event: Event) {
    this.defualtPackage = (event.target as HTMLInputElement).value;
  }

  updateDesignation(): void {
    console.log(this.designationId, this.formData.value.updateDesignation, this.formData.value.updateSalaryPackage);
    this.adminService
      .updateDesignation(
        this.designationId, this.formData.value.updateDesignation, this.formData.value.updateSalaryPackage
      )
      .subscribe(
        (response) => {
          console.log('Designation updated successfully:', response.data);
          this.formData.reset();
        },
        (error) => {
          alert('Error in updating Designation...!');
          console.error('Error updating Designation:', error);
          this.formData.reset();
        }
      );
  }
}
