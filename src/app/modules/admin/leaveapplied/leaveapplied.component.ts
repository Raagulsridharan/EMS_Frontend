import { Component, Input, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-leaveapplied',
  templateUrl: './leaveapplied.component.html',
  styleUrl: './leaveapplied.component.scss',
})
export class LeaveappliedComponent implements OnInit{
  
  @Input() id!: number;
  @Input() empId!: number;
  @Input() leaveType!: number;
  @Input() status!: string;

  formData!: FormGroup;
  statusOption: string[] = ['Approved', 'Rejected'];

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<LeaveappliedComponent>
  ) {}

  ngOnInit() {
    console.log(this.empId)
    this.formData = this.formBuilder.group({
      statusSelected: ['', [Validators.required]],
    });
  }

  isStatusDisabled(statusId: string): boolean {
    return statusId === this.status;
  }

  updateLeaveStatus(){
    this.adminService.updateLeaveStatus(this.id, this.empId, this.leaveType, this.formData.value.statusSelected).subscribe(
      (response) => {
        console.log('Leave updated successfully:', response);
        this.formData.reset();
        this.modalRef.close();
        window.location.reload();
      },
      (error) => {
        alert('Error in updating leave...!');
        console.error('Error updating leave:', error);
        this.formData.reset();
      }
    );
  }
}
