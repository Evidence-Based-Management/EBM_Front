import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class KVACurrentValueService {
  jsonUrlIteration = URL_SERVICE + 'KVACurrentValue/';
  token: string;
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');

    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
  }

  save(KVACurrentValue: any): Observable<any> {
    return this.http
      .post(this.jsonUrlIteration + 'save', KVACurrentValue, {
        headers: this.httpOptions,
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, KVACurrentValue: any): Observable<any> {
    return this.http
      .put(this.jsonUrlIteration + id, KVACurrentValue, {
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
