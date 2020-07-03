import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { IAppointment } from '../ui/interfaces/IAppointment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IUser} from '../../app/model/Nofication';

@Injectable({
  providedIn: 'root'
})
export class AdminService  {
  constructor(private auth: AuthService, private http: HttpClient) {
  
   }
  baseUrl: string = 'http://localhost:5000/api/'//"https://wonderservice.herokuapp.com/api/"
  
  
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
  UpdateUser(body:IUser): Observable<any> {
    var authToken = this.auth.getFromLocalSorage();
    let headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    }
    return this.http.put<any>(this.baseUrl+"user",body,headers).pipe(tap(data => data),catchError(this.auth.handleError))
  }
  GetUser(): Observable<IUser>{
    var authToken = this.auth.getFromLocalSorage();
    let headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    }
return this.http.get<IUser>(this.baseUrl+"user/id",headers).pipe(tap(data => data),catchError(this.auth.handleError))
  }
  updatePassword(body): Observable<any> {
    var authToken = this.auth.getFromLocalSorage();
    let headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    }
    return this.http.put<any>(this.baseUrl+"user/password",body,headers).pipe(tap(data => data),catchError(this.auth.handleError))
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
