import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from "../services/auth/auth.service";
import * as decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(public auth:AuthService,public router:Router){}
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  canActivate(route: ActivatedRouteSnapshot): boolean {
      const expectedRole = route.data.expectedRole;
      let tokenPayload;
    const token = localStorage.getItem("Auth_token")
      if (token != undefined || token != null) {
          tokenPayload = decode(token);
      }
      if (!this.auth.isUserLoggedIn() || tokenPayload.role !== expectedRole) {
          this.router.navigateByUrl("auth/login")
          return false
      }
      return true
  }

}  