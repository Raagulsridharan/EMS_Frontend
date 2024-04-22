import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-totalemployeecount',
  templateUrl: './totalemployeecount.component.html',
  styleUrl: './totalemployeecount.component.scss',
})
export class TotalemployeecountComponent implements OnInit {
  totalEmployeeCount!: number;
  totalDepartmentCount!: number;
  totalLeaveType!: number;
  totalApprovedLeaves!: number;
  totalRajectedLeaves!: number;
  totalRequestedLeaves!: number;

  cards: { title: string; count: number; router: string }[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchTotalEmployeeCount();
    this.fetchTotalDepartment();
    this.fetchTotalLeaveTypes();
    this.fetchTotalApprovedLeaves();
    this.fetchTotalRejectedLeaves();
    this.fetchTotalRequestedLeaves();
  }

  fetchTotalEmployeeCount() {
    this.adminService.getCountOfTotalEmployees().subscribe(
      (total) => {
        this.totalEmployeeCount = total;
        this.updateCards();
      },
      (error) => {
        console.error('Error fetching total customers count:', error);
      }
    );
  }

  fetchTotalDepartment() {
    this.adminService.getCountOfTotalDepartments().subscribe(
      (total) => {
        this.totalDepartmentCount = total;
        this.updateCards();
      },
      (error) => {
        console.error('Error fetching total customers count:', error);
      }
    );
  }

  fetchTotalLeaveTypes() {
    this.adminService.getCountOfTotalLeaveTypes().subscribe(
      (total) => {
        this.totalLeaveType = total;
        this.updateCards();
      },
      (error) => {
        console.error('Error fetching total customers count:', error);
      }
    );
  }

  fetchTotalApprovedLeaves() {
    this.adminService.getCountOfApprovedLeaves().subscribe(
      (total) => {
        this.totalApprovedLeaves = total;
        this.updateCards();
      },
      (error) => {
        console.error('Error fetching total customers count:', error);
      }
    );
  }

  fetchTotalRejectedLeaves() {
    this.adminService.getCountOfRejectedLeaves().subscribe(
      (total) => {
        this.totalRajectedLeaves = total;
        this.updateCards();
      },
      (error) => {
        console.error('Error fetching total customers count:', error);
      }
    );
  }


  fetchTotalRequestedLeaves() {
    this.adminService.getCountOfRequestedLeaves().subscribe(
      (total) => {
        this.totalRequestedLeaves = total;
        this.updateCards();
      },
      (error) => {
        console.error('Error fetching total customers count:', error);
      }
    );
  }

  updateCards() {
    this.cards = [
      {
        title: 'Employees',
        count: this.totalEmployeeCount,
        router: '/admin/employee',
      },
      {
        title: 'Departments',
        count: this.totalDepartmentCount,
        router: '/admin/department',
      },
      {
        title: 'Leave Types',
        count: this.totalLeaveType,
        router: 'leaveType',
      },
      {
        title: 'Approved Leaves',
        count: this.totalApprovedLeaves,
        router: '/admin/approvedLeaves',
      },
      {
        title: 'Rejected Leaves',
        count: this.totalRajectedLeaves,
        router: '/admin/rejectedLeaves',
      },
      {
        title: 'Requested Leaves',
        count: this.totalRequestedLeaves,
        router: '/admin/requestedLeaves',
      }
    ];
  }
}
