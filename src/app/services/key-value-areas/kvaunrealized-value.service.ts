import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_SERVICE } from '../../config/config';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class KVAUnrealizedValueService {
  jsonUrlIteration = URL_SERVICE + 'KVAUnrealizedValue/';
  httpOptions: any;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.setUserAuthentication();
  }

  setUserAuthentication(): void {
    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth.token,
    });
  }

  save(KVAUnrealizedValue: any): Observable<any> {
    this.setUserAuthentication();
    return this.http
      .post(this.jsonUrlIteration + 'save', KVAUnrealizedValue, {
        headers: this.httpOptions,
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, KVAUnrealizedValue: any): Observable<any> {
    this.setUserAuthentication();
    return this.http
      .put(this.jsonUrlIteration + id, KVAUnrealizedValue, {
        headers: this.httpOptions,
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
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
