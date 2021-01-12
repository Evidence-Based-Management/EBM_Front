import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckTokenGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    console.log('Token guard');

    const token = this.auth.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);


    const expirado = this.expired(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.checkRenew(payload.exp);
  }

  checkRenew(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();

      ahora.setTime(ahora.getTime() + 1 * 60 * 60 * 1000);
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.auth.renewToken().subscribe(
          () => {
            resolve(true);
          },
          () => {
            this.router.navigate(['/login']);
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
