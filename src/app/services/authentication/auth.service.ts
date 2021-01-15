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
  id: number;
  user: string;
  token: string;

  jsonUrlUsers = URL_SERVICE + 'auth/';
  constructor(private http: HttpClient, public router: Router) {
    this.loadLocalStorage();
  }

  signup(user: User): Observable<any> {
    return this.http
      .post(this.jsonUrlUsers + 'signup', user, { responseType: 'json' })
      .pipe(
        map((response: any) => {
          if (response.username === user.username) {
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.errorHandler)
      );
  }
  signin(user: User): Observable<any> {
    return this.http
      .post(this.jsonUrlUsers + 'signin', user, { responseType: 'json' })
      .pipe(
        map((resp: any) => {
          this.saveLocaStorage(resp.id, resp.jwt, resp.userName);
          return true;
        }),
        catchError(this.errorHandler)
      );
  }

  checkUserName(userName: string): Observable<any> {
    return this.http
      .get(this.jsonUrlUsers + 'checkusername/' + userName, {
        responseType: 'json',
      })
      .pipe(
        map((response: any) => {
          return response;
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
    this.id = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this.router.navigate(['/signin']);
  }

  saveLocaStorage(id: number, token: string, username: string): boolean {
    localStorage.setItem('id', id.toString());
    localStorage.setItem('token', token);
    localStorage.setItem('user', username);
    this.id = id;
    this.user = username;
    this.token = token;
    return true;
  }

  loadLocalStorage(): boolean {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = localStorage.getItem('user');
      this.id = Number(localStorage.getItem('id'));
      return true;
    } else {
      this.token = null;
      this.user = null;
      this.id = null;
      return false;
    }
  }

  renewToken(): Observable<any> {
    let url = this.jsonUrlUsers + 'renewtoken';
    url += '/' + this.token;

    return this.http.get(url).pipe(
      catchError((err) => {
        this.router.navigate(['/login']);
        return throwError(err);
      }),
      map((resp: any) => {
        this.token = resp.jwt;
        localStorage.setItem('token', this.token);
        return true;
      })
    );
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
