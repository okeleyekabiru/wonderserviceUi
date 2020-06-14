import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn():boolean {
    var token = JSON.parse(localStorage.getItem("Auth_token"))

    if (token != null || token != undefined)
    return !this.jwtHelper.isTokenExpired(token.token)
return false
  }

  constructor(private jwtHelper:JwtHelperService) { }
}
