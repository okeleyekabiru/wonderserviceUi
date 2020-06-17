import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { IAppointment } from '../ui/interfaces/IAppointment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService  {
  constructor(private auth: AuthService,private http:HttpClient) { }
  baseUrl:string = "http://localhost:5000/api/"
  GetPost(): Observable<IAppointment[]>{
    var authToken = this.auth.getFromLocalSorage();
    let headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    }
    return this.http.get<IAppointment[]>(this.baseUrl+'order',headers).pipe(tap(data => data),catchError(this.auth.handleError))
    
  }
  
}
