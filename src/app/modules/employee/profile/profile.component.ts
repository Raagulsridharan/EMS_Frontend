import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../model_class/employee';
import { EmployeeService } from '../../../services/employee.service';
import { HttpStatusClass } from '../../../model_class/httpStatusClass';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  employee: any;

  constructor(private modalService: MdbModalService, private employeeService: EmployeeService) {}
  
  ngOnInit(): void {
    const empId = localStorage.getItem('employeeId');
    this.employeeService.getEmployeeById(empId).subscribe(
      (response:HttpStatusClass)=>{
        this.employee = response.data;
      }
    );
  }

  openUpdateModal() {
    console.log(this.employee);
    const modalRef: MdbModalRef<UpdateProfileComponent> = this.modalService.open(UpdateProfileComponent, {
      modalClass: 'modal-dialog-centered',
      animation: true,
    });
    modalRef.component.employee = this.employee;
  }

  openChangePassword() {
    console.log(this.employee);
    const modalRef: MdbModalRef<ChangePasswordComponent> = this.modalService.open(ChangePasswordComponent, {
      modalClass: 'modal-dialog-centered',
      animation: true,
    });
    modalRef.component.employee = this.employee;
  }
  
}
