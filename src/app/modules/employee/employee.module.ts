import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { HomeComponent } from './home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { NavbarComponent } from './navbar/navbar.component';
import { SalaryComponent } from './salary/salary.component';
import { LeaveApplyComponent } from './leave-apply/leave-apply.component';
import { ProfileComponent } from './profile/profile.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SalaryComponent,
    LeaveApplyComponent,
    ProfileComponent,
    UpdateProfileComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    MdbValidationModule,
    MdbCollapseModule,
    MdbFormsModule,
    MdbTabsModule,
    MDBBootstrapModule.forRoot(), // Import the module that declares mdbCollapse
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
})
export class EmployeeModule {}
