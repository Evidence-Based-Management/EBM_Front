import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SigInGuard implements CanActivate {
  path: import('@angular/router').ActivatedRouteSnapshot[];
  route: import('@angular/router').ActivatedRouteSnapshot;

  constructor(public auth: AuthService, public router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/sigin']);
      return false;
    }
  }
}
