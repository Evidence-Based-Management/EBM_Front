import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class KVAUnrealizedValueService {
  jsonUrlIteration = URL_SERVICE + 'KVAUnrealizedValue/';

  constructor(private http: HttpClient) {}

  save(KVAUnrealizedValue: any): Observable<any> {
    return this.http
      .post(this.jsonUrlIteration + 'save', KVAUnrealizedValue, {
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, KVAUnrealizedValue: any): Observable<any> {
    return this.http
      .put(this.jsonUrlIteration + id, KVAUnrealizedValue, {
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
