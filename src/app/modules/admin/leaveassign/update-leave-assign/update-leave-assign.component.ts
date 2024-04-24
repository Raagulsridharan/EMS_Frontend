import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';
import { UpdateLeave } from '../../../../model_class/updateLeave';
import { HttpStatusClass } from '../../../../model_class/httpStatusClass';

@Component({
  selector: 'app-update-leave-assign',
  templateUrl: './update-leave-assign.component.html',
  styleUrl: './update-leave-assign.component.scss',
})
export class UpdateLeaveAssignComponent {
  @Input() empId!: number;
  formData!: FormGroup;

  leaves!: UpdateLeave[];

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<UpdateLeaveAssignComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchEmployeeLeaves();
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      updatedNoOfDays: ['', Validators.required],
    });
  }

  fetchEmployeeLeaves() {
    this.adminService
      .gettingEmployeeLeaves(this.empId)
      .subscribe((response: HttpStatusClass) => {
        if (response.statusCode === 200) {
          console.log(response.data);
          this.leaves = response.data;
          this.initLeaveTypeFormControls();
        } else {
          console.error('Error fetching leaves of employees:', response.description);
        }
      });
  }

  initLeaveTypeFormControls(): void {
    // Dynamically add form controls for each leave type
    this.leaves.forEach((leaves, index) => {
      this.formData.addControl(
        `updatedNoOfdays${index}`,
        this.formBuilder.control('', Validators.required)
      );
    });
  }

  updateLeave(){
    console.log(this.formData.value)
  }
}
