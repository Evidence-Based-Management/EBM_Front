import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckTokenGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    if (this.auth.isLogged()) {
      const token = this.auth.token;

      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirado = this.expired(payload.exp);

      if (expirado) {
        this.auth.logout();
        return false;
      }

      return this.checkRenew(payload.exp);
    } else {
      console.error('Blocked by Guard CheckToken');

      return false;
    }
  }

  // When there is an hour to expire the token and the user still navigates, an attempt will be made to renew the token
  checkRenew(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const ahora = new Date();
      const tokenExp = new Date(fechaExp * 1000); // Normalize to Date in milliseconds
      ahora.setTime(ahora.getTime() + 1 * 60 * 60 * 1000); // Add 1 hour to time now in millisecionds

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.auth.renewToken().subscribe(
          () => {
            resolve(true);
          },
          () => {
            this.auth.logout();
            reject(false);
          }
        );
      }
    });
  }

  expired(fechaExp: number): boolean {
    const ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }
}
