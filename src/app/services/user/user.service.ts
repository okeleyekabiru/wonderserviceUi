import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { IOption, IOptions } from '../../../app/ui/interfaces/option';
import { tap, catchError } from 'rxjs/operators';
import { IRenderedService } from '../../../app/interfaces/IRenderServices';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private baseUrl:string ="https://wonderservice.herokuapp.com/"//'http://localhost:5000/'
  constructor(private http: HttpClient) {
  
   }
  loadState(): Observable<IOptions>{
    return this.http.get<IOptions>(this.baseUrl+"api/states").pipe(tap(data => data),catchError(this.handleError))
  }
  getServiceType<T>(appointment: boolean = false): Observable<T> {
    let url;
    if (appointment) 
      url ='api/category/all?appointment=true'
    else url ='api/category/all'
    return this.http.get<T>(this.baseUrl+url).pipe(tap(data =>data),catchError(this.handleError))
  }
  loadLocalGovernment(states): Observable<IOptions>{
    return this.http.get<IOptions>(this.baseUrl+`api/states/sub?localGovernment=${states}`).pipe(tap(data => data), catchError(this.handleError))
  }
  postOrder(body: any) {
    return this.http.post<boolean>(this.baseUrl+"api/order",body).pipe(tap(data=> data),catchError(this.handleError))
  }

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
  loadRenderedservice():Observable<IRenderedService[]> {
   return this.http.get<IRenderedService[]>(this.baseUrl+'api/service/all').pipe(tap(data => data),catchError(this.handleError))
  }
}
