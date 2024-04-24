import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';
import { UpdateLeave } from '../../../../model_class/updateLeave';
import { HttpStatusClass } from '../../../../model_class/httpStatusClass';
import { LeaveAssign } from '../../../../model_class/leaveAssign';
import { LeaveType } from '../../../../model_class/leaveType';

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
      leaveId: ['', Validators.required],
      // noOfDays: ['', Validators.required],
      updatedNoOfDays: ['', Validators.required],
    });
  }

  fetchAllLeaveTypes(): void {
    this.adminService.getAllLeaveType().subscribe(
      (leaves) => {
        this.leaveTypes = leaves.data || [];
        console.log(leaves);
        this.initLeaveTypeFormControls();
      },
      (error) => {
        console.log('Error fetching departments:', error);
      }
    );
  }

  initLeaveTypeFormControls(): void {
    // Dynamically add form controls for each leave type
    this.leaveTypes.forEach((leaveType, index) => {
      this.formData.addControl(
        `leaveId${index}`,
        this.formBuilder.control('', Validators.required)
      );
      this.formData.addControl(
        `updatedNoOfDays${index}`,
        this.formBuilder.control('', Validators.required)
      );
    });
  }

  updateLeave(){
    console.log(this.formData);
    //const empId: number = this.formData.value.employeeId;
    this.leaveAssignList = [];
    this.leaveTypes.forEach((leaveType, index) => {
      const leaveId = this.formData.get(`leaveId${index}`)?.value;
      const updatedNoOfDays = this.formData.get(`updatedNoOfDays${index}`)?.value;
      if (leaveId !== null && updatedNoOfDays !== null) {
        this.leaveAssignList.push({
          leaveId: leaveId.toString(),
          noOfdays: +updatedNoOfDays,
        });
      }
    });
    console.log(this.empId, this.leaveAssignList);
    this.adminService
      .updateLeaveForEmployee(this.empId, this.leaveAssignList)
      .subscribe(
        (response) => {
          console.log('Response from backend:', response);
          this.formData.reset();
          this.modalRef.close();
        },
        (error) => {
          console.error('Error from backend:', error);
          this.formData.reset();
        }
      );
  }
}
