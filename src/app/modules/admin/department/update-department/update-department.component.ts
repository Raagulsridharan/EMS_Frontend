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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tick } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrl: './update-department.component.scss',
})
export class UpdateDepartmentComponent implements OnInit {
  [x: string]: any;

  defaultName!: string;
  formData!: FormGroup;
  @Input() departmentId!: number;
  @Input() departmentName!: string;

  defaultValue: string = '';

  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<UpdateDepartmentComponent>
  ) {}

  ngOnInit() {
    this.defaultValue = this.departmentName;
    this.formData = this.formBuilder.group({
      updateDepartmentName: [this.defaultValue, [Validators.required]],
    });
  }

  onInput(event: Event) {
    this.defaultValue = (event.target as HTMLInputElement).value;
  }

  updateDepartment(): void {
    //console.log(this.departmentId, this.formData.value.updateDepartmentName);
    if(this.formData.valid){
      this.adminService
      .updateDepartment(
        this.departmentId,
        this.formData.value.updateDepartmentName
      )
      .subscribe({
        next:(response) => {
          this.formData.reset();
          this.modalRef.close();
        },
        error:(error) => {
          this.formData.reset();
          this.toastrService.error('Duplicate entry!')
        }
      });
    }else{
      this.toastrService.warning('Please Update!')
    }
  }
}
