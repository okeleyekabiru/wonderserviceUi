import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { IOption, IOptions } from '../../../app/ui/interfaces/option';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private baseUrl = "http://localhost:5000/"
  constructor(private http: HttpClient) { }
  loadState(): Observable<IOptions>{
    return this.http.get<IOptions>(this.baseUrl+"api/states").pipe(tap(data => console.log(data)),catchError(this.handleError))
  }
  getServiceType():  Observable<IOption[]> {
    return this.http.get<IOption[]>(this.baseUrl+"api/category/all").pipe(tap(data =>console.log(data)),catchError(this.handleError))
  }
  loadLocalGovernment(states): Observable<IOptions>{
    return this.http.get<IOptions>(this.baseUrl+`api/states/sub?localGovernment=${states}`).pipe(tap(data => data), catchError(this.handleError))
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
}
