import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SigInGuard implements CanActivate {
  path: import('@angular/router').ActivatedRouteSnapshot[];
  route: import('@angular/router').ActivatedRouteSnapshot;

  constructor(public router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (this.usuarioService.estaLogueado()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    // this.router.navigate(['/sigin']);
    return true;
  }
}
