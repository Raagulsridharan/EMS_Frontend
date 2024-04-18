import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { HomeComponent } from './home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MdbCollapseModule,
    MdbFormsModule,
    MdbTabsModule,
    MDBBootstrapModule.forRoot() // Import the module that declares mdbCollapse

  ]
})
export class EmployeeModule { }
