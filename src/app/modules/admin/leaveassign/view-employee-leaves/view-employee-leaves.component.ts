import { Component, Input, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';
import { HttpStatusClass } from '../../../../model_class/httpStatusClass';
import { UpdateLeave } from '../../../../model_class/updateLeave';

@Component({
  selector: 'app-view-employee-leaves',
  templateUrl: './view-employee-leaves.component.html',
  styleUrl: './view-employee-leaves.component.scss'
})
export class ViewEmployeeLeavesComponent implements OnInit{

  @Input() empId!: number;
  leaves!: UpdateLeave[];

  constructor(
    private adminService: AdminService,
    public modalRef: MdbModalRef<ViewEmployeeLeavesComponent>
  ) {}
  
  ngOnInit(): void {
    this.fetchEmployeeLeaves();
  }

  fetchEmployeeLeaves() {
    this.adminService
      .gettingEmployeeLeaves(this.empId)
      .subscribe((response: HttpStatusClass) => {
        if (response.statusCode === 200) {
          console.log(response.data);
          this.leaves = response.data;
        } else {
          console.error('Error fetching leaves of employees:', response.description);
        }
      });
  }

}
