import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { HomeComponent } from './home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MdbCollapseModule,
    MDBBootstrapModule.forRoot() // Import the module that declares mdbCollapse

  ]
})
export class EmployeeModule { }
