import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule} from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { DepartmentComponent } from './department/department.component';
import { TotalemployeecountComponent } from './dashboard/totalemployeecount/totalemployeecount.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeComponent } from './employee/employee.component';
import { RolemappingComponent } from './rolemapping/rolemapping.component';
import { LeaveassignComponent } from './leaveassign/leaveassign.component';
import { PayrollComponent } from './payroll/payroll.component';
import { LeaveappliedComponent } from './leaveapplied/leaveapplied.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RejectedLeavesComponent } from './leaveapplied/rejected-leaves/rejected-leaves.component';
import { RequestedLeavesComponent } from './leaveapplied/requested-leaves/requested-leaves.component';
import { ApprovedLeavesComponent } from './leaveapplied/approved-leaves/approved-leaves.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { UpdateDepartmentComponent } from './department/update-department/update-department.component';
import { UpdateDesignationComponent } from './designation/update-designation/update-designation.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { UpdateLeaveAssignComponent } from './leaveassign/update-leave-assign/update-leave-assign.component';
import { UpdateRoleMappingComponent } from './rolemapping/update-role-mapping/update-role-mapping.component';
import { PaymentHistoryComponent } from './payroll/payment-history/payment-history.component';
import { DeleteEmployeeComponent } from './employee/delete-employee/delete-employee.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';
import { MakePaymentComponent } from './payroll/make-payment/make-payment.component';
import { ViewEmployeeLeavesComponent } from './leaveassign/view-employee-leaves/view-employee-leaves.component';


@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent,
    DepartmentComponent,
    TotalemployeecountComponent,
    DesignationComponent,
    EmployeeComponent,
    RolemappingComponent,
    LeaveassignComponent,
    PayrollComponent,
    LeaveappliedComponent,
    RejectedLeavesComponent,
    RequestedLeavesComponent,
    ApprovedLeavesComponent,
    AddEmployeeComponent,
    UpdateDepartmentComponent,
    UpdateDesignationComponent,
    UpdateEmployeeComponent,
    UpdateLeaveAssignComponent,
    UpdateRoleMappingComponent,
    PaymentHistoryComponent,
    DeleteEmployeeComponent,
    ViewEmployeeComponent,
    MakePaymentComponent,
    ViewEmployeeLeavesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MdbCollapseModule,
    MdbModalModule,
    MdbValidationModule,
  ]
})
export class AdminModule { }