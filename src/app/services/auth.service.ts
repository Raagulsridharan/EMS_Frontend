import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { EmpFlag } from '../model_class/empFlag';
import { HttpStatusClass } from '../model_class/httpStatusClass';
import { BaseUrl } from '../model_class/baseUrl';
import { ToastrService } from 'ngx-toastr';
import { LoginDetails } from '../model_class/loginDetails';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  empFlag: EmpFlag = new EmpFlag();

  login(loginData:LoginDetails):Observable<EmpFlag>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<HttpStatusClass>(BaseUrl.LOGIN_DETAILS_URL, loginData, { headers })
      .pipe(
        map((response) => {
          //console.log(response);
          this.empFlag.empId = response.data.empId;
          this.empFlag.flag = response.data.flag;
          return this.empFlag;
        }),
        catchError((error) => {
          
          throw error;
        })
      );
  }

  getUserType(email: string): Observable<HttpStatusClass> {
    return this.http.get<HttpStatusClass>(
      BaseUrl.DESIGNATION_URL + '/user-type/' + email
    );
  }

  updatePassword(empId: string, password: string): Observable<HttpStatusClass> {
    const body = {
      empId: empId,
      password: password,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put<HttpStatusClass>(BaseUrl.LOGIN_DETAILS_URL, body, {
      headers,
    });
  }
}
