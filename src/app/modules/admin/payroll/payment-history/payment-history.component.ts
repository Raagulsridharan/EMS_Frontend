import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../../../../model_class/payment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpStatusClass } from '../../../../model_class/httpStatusClass';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MakePaymentComponent } from '../make-payment/make-payment.component';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.scss',
})
export class PaymentHistoryComponent implements OnInit {
  formData!: FormGroup;
  empId!: string;

  constructor(
    private toastr: ToastrService,
    private modalService: MdbModalService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.empId = params['id'];
    });
    this.formData = this.formBuilder.group({
      month: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.ngAfterViewInit();
  }

  formatMonthYear(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${month}, ${year}`;
    return formattedDate;
  }

  submitForm(): void {
    if (this.formData.valid) {
      console.log(this.empId, this.formData.value.description);
      const monthYear: string = this.formatMonthYear(this.formData.value.month);
      this.adminService
        .makePayment(
          this.empId,
          monthYear,
          this.formData.value.description
        )
        .subscribe({
          next:(response) => {
            //console.log('Payment make successfully:', response);
            this.formData.reset();
            this.ngAfterViewInit();
            this.toastr.success('Payment Done!')
          },
          error:(error) => {
            // alert('Error in send Payment...!');
            // console.error('Error send Payment:', error);
            this.formData.reset();
            this.toastr.error('Already Paid!')
          }
        });
    }
  }

  //----------------------------------------

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  displayedColumns: string[] = [
    'name',
    'paid_salary',
    'description',
    'month',
    'status',
    'payslip',
  ];
  dataSource = new MatTableDataSource<Payment>();

  ngAfterViewInit() {
    // Fetch data asynchronously using the service
    this.adminService
      .getEmployeesPayroll(this.empId)
      .subscribe((response: HttpStatusClass) => {
        // Assign the data to the dataSource
        console.log(response);

        this.dataSource.data = response.data;

        // Set up sorting and pagination
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportPDF(payrollId: number) {
    this.adminService.exportPDF(payrollId);
  }

  openUpdateModal(element: any) {
    console.log(element);
    const modalRef: MdbModalRef<MakePaymentComponent> =
      this.modalService.open(MakePaymentComponent);
    modalRef.component.empId = element.empId;
    modalRef.component.payrollId = element.id;
  }
}
