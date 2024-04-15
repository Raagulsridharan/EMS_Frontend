import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activation-page',
  templateUrl: './activation-page.component.html',
  styleUrl: './activation-page.component.scss'
})
export class ActivationPageComponent {
  myForm:any;
  empId!: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.empId = params['id']; // Assuming the parameter name is 'id' from the URL
    });
    this.myForm = this.formBuilder.group({
      newpassword: ['', Validators.required],
      confirmnewpassword: ['', Validators.required]
    });
  }

  updatePassword(): void{
    if (this.myForm.invalid) {
      return;
    }

    const newPassword = this.myForm.value.newpassword;
    const confirmNewPassword = this.myForm.value.confirmnewpassword;

    if (newPassword !== confirmNewPassword) {
      alert('enter correct passwords!');
      return;
    }

    this.authService.updatePassword(this.empId, newPassword)
      .subscribe(
        () => {
          // Password updated successfully, optionally navigate to another page
          alert('Password updated successfully');
          this.router.navigate(['/admin']);
        },
        error => {
          console.error('Error updating password:', error);
          alert('Error in Password updating...');
        }
      );
  }

}
