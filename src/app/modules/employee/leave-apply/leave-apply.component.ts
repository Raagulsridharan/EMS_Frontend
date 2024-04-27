import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeaveType } from '../../../model_class/leaveType';
import { HttpStatusClass } from '../../../model_class/httpStatusClass';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrl: './leave-apply.component.scss'
})
export class LeaveApplyComponent implements OnInit {
  leaveForm: FormGroup;
  leaveTypes: LeaveType[] = [];
  empId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.empId = params['id'];
    });
    this.fetchAllLeaveTypes();
    this.leaveForm = this.formBuilder.group({
      leaveType: ['', Validators.required],
      note: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  fetchAllLeaveTypes(): void {
    this.adminService.getAllLeaveType().subscribe(
      (leaves:HttpStatusClass) => {
        this.leaveTypes = leaves.data || [];
        console.log(leaves);
      },
      (error) => {
        console.log('Error fetching departments:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.leaveForm.valid) {
      console.log('Leave application submitted:', this.empId);
      this.leaveForm.reset();
    } else {

    }
  }
}