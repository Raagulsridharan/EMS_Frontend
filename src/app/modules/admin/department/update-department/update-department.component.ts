import {
  Component,
  Inject,
  InjectionToken,
  Input,
  OnInit,
} from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Department } from '../../../../model_class/department';
import { AdminService } from '../../../../services/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrl: './update-department.component.scss',
})
export class UpdateDepartmentComponent implements OnInit {
  [x: string]: any;

  formData!: FormGroup;
  @Input()
  departmentId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<UpdateDepartmentComponent>
  ) {}

  ngOnInit() {
    this.formData = this.formBuilder.group({
      updateDepartmentName: ['', [Validators.required]],
    });
  }

  updateDepartment(): void {
    console.log(this.departmentId, this.formData.value.updateDepartmentName);
    this.adminService
      .updateDepartment(
        this.departmentId,
        this.formData.value.updateDepartmentName
      )
      .subscribe(
        (response) => {
          console.log('Department updated successfully:', response.data);
          this.formData.reset();
        },
        (error) => {
          alert('Error in adding department...!');
          console.error('Error adding department:', error);
          this.formData.reset();
        }
      );
  }
}
