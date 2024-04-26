import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeComponent } from './employee/employee.component';
import { RolemappingComponent } from './rolemapping/rolemapping.component';
import { LeaveassignComponent } from './leaveassign/leaveassign.component';
import { PayrollComponent } from './payroll/payroll.component';
import { LeaveappliedComponent } from './leaveapplied/leaveapplied.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { PaymentHistoryComponent } from './payroll/payment-history/payment-history.component';
import { ApprovedLeavesComponent } from './leaveapplied/approved-leaves/approved-leaves.component';
import { RejectedLeavesComponent } from './leaveapplied/rejected-leaves/rejected-leaves.component';
import { RequestedLeavesComponent } from './leaveapplied/requested-leaves/requested-leaves.component';



const routes: Routes = [
  {
    path:'',
    component: SidebarComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'department',
        component: DepartmentComponent
      },
      {
        path: 'designation',
        component: DesignationComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'employee/addEmployee',
        component: AddEmployeeComponent
      },
      {
        path: 'rolemapping',
        component: RolemappingComponent
      },
      {
        path: 'leaveassign',
        component: LeaveassignComponent
      },
      {
        path: 'payroll',
        component: PayrollComponent
      },
      {
        path: 'payroll/paymentHistory/:id',
        component: PaymentHistoryComponent
      },
      {
        path: 'leaveapplied',
        component: LeaveappliedComponent
      },
      {
        path: 'approvedLeaves',
        component: ApprovedLeavesComponent
      },
      {
        path: 'rejectedLeaves',
        component: RejectedLeavesComponent
      },
      {
        path: 'requestedLeaves',
        component: RequestedLeavesComponent
      }
    ]
  }  
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
