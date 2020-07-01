import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { IAppointment } from '../ui/interfaces/IAppointment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminService  {
  constructor(private auth: AuthService,private http:HttpClient) { }
  baseUrl:string = "https://wonderservice.herokuapp.com/"
  GetPost(): Observable<IAppointment[]>{
    var authToken = this.auth.getFromLocalSorage();
    let headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    }
    return this.http.get<IAppointment[]>(this.baseUrl+'order',headers).pipe(tap(data => data),catchError(this.auth.handleError))
    
  }
  PostServiceRendered(body):Observable<boolean> {
    var authToken = this.auth.getFromLocalSorage();
    let headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    }
    
    
  return  this.http.post<boolean>(this.baseUrl+"service",body,headers).pipe(tap(data =>data),catchError(this.auth.handleError))
  }
  addService(data):Observable<boolean> {
    var authToken = this.auth.getFromLocalSorage();
    let headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    };
    return this.http.post<boolean>(this.baseUrl+"category",data,headers).pipe(tap(data => data),catchError(this.auth.handleError))
  }
}
