import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';
import { User } from '../../Interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: string;
  token: string;

  jsonUrlUsers = URL_SERVICE + 'auth/';
  constructor(private http: HttpClient, public router: Router) {
    this.loadLocalStorage();
  }

  signup(user: User): Observable<any> {
    return this.http
      .post(this.jsonUrlUsers + 'signup', user, { responseType: 'json' })
      .pipe(catchError(this.errorHandler));
  }
  signin(user: User): Observable<any> {
    return this.http
      .post(this.jsonUrlUsers + 'signin', user, { responseType: 'json' })
      .pipe(
        map((resp: any) => {
          this.saveLocaStorage('0', resp.jwt, resp.userName);
          return true;
        }),
        catchError(this.errorHandler)
      );
  }

  isLogged(): boolean {
    return this.token ? (this.token.length > 5 ? true : false) : false;
  }

  logout(): any {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
  }

  saveLocaStorage(id: string, token: string, username: string): boolean {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', username);
    this.user = username;
    this.token = token;
    return true;
  }

  loadLocalStorage(): boolean {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = localStorage.getItem('user');
      return true;
    } else {
      this.token = '';
      this.user = null;
      return false;
    }
  }

  errorHandler(error): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
