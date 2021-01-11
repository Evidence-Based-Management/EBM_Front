import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class KVATimeToMarketService {
  jsonUrlIteration = URL_SERVICE + 'KVATimeToMarket/';
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
  save(KVATimeToMarket: any): Observable<any> {
    this.setUserAuthentication();
    return this.http
      .post(this.jsonUrlIteration + 'save', KVATimeToMarket, {
        headers: this.httpOptions,
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, KVATimeToMarket: any): Observable<any> {
    this.setUserAuthentication();
    return this.http
      .put(this.jsonUrlIteration + id, KVATimeToMarket, {
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
