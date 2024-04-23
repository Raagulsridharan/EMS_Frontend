import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';
import { Department } from '../../../../model_class/department';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss'
})
export class DeleteEmployeeComponent {

  @Input() empId!: number;
  @Input() empName!: string;
  @Input() deptName!: Department[];
  @Input() mobille!: number;
  @Input() address!: string;

  constructor(
    private adminService: AdminService,
    public modalRef: MdbModalRef<DeleteEmployeeComponent>
  ) {}

  deleteEmployee() {
    this.adminService.deleteEmployee(this.empId).subscribe(
      (response) => {
        console.log('Employee Deleted successfully:' + response);
        this.modalRef.close();
        window.location.reload();
      },
      (error) => {
        alert('Error in deleting employee...!');
        console.error('Error deleting employee:', error);
      }
    );
  }
}
