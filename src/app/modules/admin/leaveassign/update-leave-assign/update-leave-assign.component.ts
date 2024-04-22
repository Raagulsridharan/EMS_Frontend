import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-update-leave-assign',
  templateUrl: './update-leave-assign.component.html',
  styleUrl: './update-leave-assign.component.scss'
})
export class UpdateLeaveAssignComponent {

  formData!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<UpdateLeaveAssignComponent>
  ) {}

}
