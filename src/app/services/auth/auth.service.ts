import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { IAuthModel } from '../../interfaces/authmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  private baseUrl = "http://localhost:5000/api/user"

  private handleError(err: HttpErrorResponse) {
 
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  login(body): Observable<IAuthModel> {
    return this.http.post<IAuthModel>(this.baseUrl + "/login", body).pipe(tap(data => data), catchError(this.handleError))
  }
  storeToLocalStorage(data:string) {
    localStorage.setItem("Auth_token", data)
      
  }
  getFromLocalSorage(): string {
    if (localStorage.getItem("Auth_token") !== null || localStorage.getItem("Auth_token") !== undefined)
      return JSON.parse(localStorage.getItem("Auth_token")).token;
  
    return null;
  }
  isUserLoggedIn(): boolean {

    const token = localStorage.getItem("Auth_token")

    if (token != null || token != undefined)
      return !this.jwtHelper.isTokenExpired(token)
    return false
  }
}