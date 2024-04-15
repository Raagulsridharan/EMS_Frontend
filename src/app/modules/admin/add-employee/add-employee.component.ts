import { Component, OnInit } from '@angular/core';
import { Department } from '../../../model_class/Department';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit{

  departments: Department[] = [];

  constructor(private adminService: AdminService){}

  ngOnInit(): void{
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.adminService.getAllDepartments().subscribe(
      departments => {
        this.departments = departments;
        console.log(departments);
      },
      error => {
        console.log('Error fetching departments:', error);
      }
    );
  }

}
