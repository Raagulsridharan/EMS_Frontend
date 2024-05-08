import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';
import { UpdateLeave } from '../../../../model_class/updateLeave';
import { HttpStatusClass } from '../../../../model_class/httpStatusClass';
import { LeaveAssign } from '../../../../model_class/leaveAssign';
import { LeaveType } from '../../../../model_class/leaveType';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-leave-assign',
  templateUrl: './update-leave-assign.component.html',
  styleUrl: './update-leave-assign.component.scss',
})
export class UpdateLeaveAssignComponent {
  @Input() empId!: number;
  formData!: FormGroup;

  leaves!: UpdateLeave[];
  leaveTypes: LeaveType[] = [];
  leaveAssignList: LeaveAssign[] = [];

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<UpdateLeaveAssignComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchAllLeaveTypes();
  }

  initForm(): void {
    this.formData = this.formBuilder.group({
      // leaveId: ['', Validators.required],
      // updatedNoOfDays: ['', Validators.required],
    });
  }

  fetchAllLeaveTypes(): void {
    this.adminService.getAllLeaveType().subscribe({
      next: (leaves) => {
        this.leaveTypes = leaves.data || [];
        this.initLeaveTypeFormControls();
      },
      error: (error) => {
        //console.log('Error fetching departments:', error);
      },
    });
  }

  initLeaveTypeFormControls(): void {
    this.leaveTypes.forEach((leaveType, index) => {
      this.formData.addControl(
        `updatedNoOfDays${leaveType.id}`,
        this.formBuilder.control('', Validators.required)
      );
    });
  }

  updateLeave() {
    if (this.formData.valid) {
      this.leaveAssignList = [];
      this.leaveTypes.forEach((leaveType, index) => {
        const updatedNoOfDays = this.formData.get(
          `updatedNoOfDays${leaveType.id}`
        )?.value;
        if (updatedNoOfDays !== null) {
          this.leaveAssignList.push({
            leaveId: leaveType.id,
            leaveType: leaveType.leaveType,
            noOfdays: updatedNoOfDays,
          });
        }
      });
      console.log(this.empId, this.leaveAssignList);
      this.adminService
        .updateLeaveForEmployee(this.empId, this.leaveAssignList)
        .subscribe({
          next: (response) => {
            this.formData.reset();
            this.modalRef.close();
            this.toastr.success('Leave Updated');
          },
          error: (error) => {
            this.formData.reset();
          },
        });
    }else{
      this.toastr.warning('Enter All fields!!!')
    }
  }
}
