import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  basePath = 'http://localhost:3000/';
  //public httpOptions: any;
  public currentAccessToken: any;
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  
    // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4400',
      "Accept": "application/json", 
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + this.currentAccessToken,
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  // Verify user credentials on server to get token
  loginForm(data:any): Observable<Response> {
    return this.http
      .post<Response>(this.basePath +'token', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  
  // After login save token and other values(if any) in localStorage
  setUser(response: any) {
    localStorage.setItem('userid', response.userDetails[0].u_id);
    localStorage.setItem('access_token', response.accesstoke);
    //this.router.navigate(['/dashboard']);
  }

  createUser(data:any): Observable<Response> {
    return this.http.post<Response>(this.basePath+'user', data)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

}
