import { Component, Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AdminService } from '../../../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.scss'
})
export class MakePaymentComponent {

  formData!: FormGroup;
  @Input() empId!: number;
  @Input() payrollId!: number;

  constructor(
    
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    public modalRef: MdbModalRef<MakePaymentComponent>
  ) {}

  ngOnInit() {
    this.formData = this.formBuilder.group({
      description: ['', [Validators.required]],
    });
  }

  updateEmployeesPayroll(){
      this.adminService.updateEmployeesPayroll(this.empId, this.payrollId, this.formData.value.description).subscribe(
        (response) => {
          console.log('Employee Payroll updated successfully:' + response);
          this.modalRef.close();
          window.location.reload();
        },
        (error) => {
          alert('Error in updating employee payroll...!');
          console.error('Error updating employee payroll:', error);
        }
      );
  }

}
