import { Injectable, isDevMode } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { IAuthModel } from '../../interfaces/authmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    
   }
  private baseUrl:string = "https://wonderservice.herokuapp.com/api/user"

public handleError(err: HttpErrorResponse) {
 
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
   
   return localStorage.getItem("Auth_token")
  
   
  }
  
  isUserLoggedIn(): boolean {

    const token = localStorage.getItem("Auth_token")

    if (token != null || token != undefined)
      return !this.jwtHelper.isTokenExpired(token)
    return false
  }
}