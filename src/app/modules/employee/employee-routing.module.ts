import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SalaryComponent } from './salary/salary.component';
import { LeaveApplyComponent } from './leave-apply/leave-apply.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:':id',
    component: HomeComponent,
    children: [
      {
        path: 'salary/:id',
        component: SalaryComponent
      },
      {
        path: 'leaveApply',
        component: LeaveApplyComponent
      },
      {
        path: 'profile/:id',
        component: ProfileComponent
      },
      {
        path: '', // Redirect empty path to HomeComponent
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  },
  { 
    path: '**', // Wildcard route for unmatched paths
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
