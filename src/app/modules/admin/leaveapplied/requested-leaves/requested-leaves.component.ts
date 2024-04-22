import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveApplied } from '../../../../model_class/leaveApplied';
import { AdminService } from '../../../../services/admin.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LeaveappliedComponent } from '../leaveapplied.component';

@Component({
  selector: 'app-requested-leaves',
  templateUrl: './requested-leaves.component.html',
  styleUrl: './requested-leaves.component.scss'
})
export class RequestedLeavesComponent {

  
  constructor(
    private modalService: MdbModalService,
    private adminService: AdminService
  ) {}

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = [
    'id',
    'name',
    'dept',
    'leaveType',
    'fromDate',
    'toDate',
    'note',
    'submittedOn',
    'Action',
  ];
  dataSource = new MatTableDataSource<LeaveApplied>();

  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService.getAllRequestedLeaves().subscribe((response) => {
      // Assign the data to the dataSource
      console.log(response);

      this.dataSource.data = response.data;

      // Set up sorting and pagination
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openUpdateModal(element: any) {
    console.log(element)
    const modalRef: MdbModalRef<LeaveappliedComponent> = this.modalService.open(LeaveappliedComponent);
    modalRef.component.id = element.id;
    modalRef.component.empId = element.employee_leave_applied.id;
    modalRef.component.leaveType = element.leavePolicy.id;
    modalRef.component.status = element.status;
  }

}
