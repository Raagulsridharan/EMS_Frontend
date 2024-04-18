import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { EmpFlag } from '../model_class/empFlag';
import { HttpStatusClass } from '../model_class/httpStatusClass';

const baseUrl = ['http://localhost:8080'];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {

    const body = {
      username: email,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<EmpFlag>(`${baseUrl}/empLogin`, body, { headers })
    .pipe(
      catchError((error: any) => {
        if (error.status === 400 || error.status === 500) {
          alert('Invalid credentials. Please try again.');
        }
        else {
          console.log(
            'Setting alert message: Login failed. Please try again later.'
          );
          console.error('Login failed. Error:', error);
        }
        return throwError(error);
      })
    );
  }

  getUserType(email: string): Observable<HttpStatusClass> {
    return this.http.get<HttpStatusClass>(baseUrl + '/designations/getUserType/' + email);
  }

  updatePassword(empId: string, password: string): Observable<any>{

    const body = {
      empId: empId,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(`${baseUrl}/empLogin`,body, { headers });
  }

}
