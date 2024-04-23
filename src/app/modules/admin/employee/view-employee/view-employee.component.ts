import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Department } from '../../../../model_class/department';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.scss'
})
export class ViewEmployeeComponent {

  @Input() empId!: number;
  @Input() empName!: string;
  @Input() gender!: string;
  @Input() mobile!: number;
  @Input() birthday!: any;
  @Input() email!: string;
  @Input() deptName!: Department[];
  @Input() address!: string;

  constructor(
    private adminService: AdminService,
    public modalRef: MdbModalRef<ViewEmployeeComponent>
  ) {}

}
