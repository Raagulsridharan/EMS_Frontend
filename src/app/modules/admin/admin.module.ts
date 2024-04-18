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
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

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
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';



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
    AddEmployeeComponent
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
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MdbCollapseModule,
    MdbModalModule
  ]
})
export class AdminModule { }