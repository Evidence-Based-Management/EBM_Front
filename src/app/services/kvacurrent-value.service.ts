import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../config/config';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KVACurrentValueService {
  jsonUrlIteration = URL_SERVICE + 'KVACurrentValue/';

  constructor(private http: HttpClient) {}

  save(KVACurrentValue: any): Observable<any> {
    return this.http
      .post(this.jsonUrlIteration + 'save', KVACurrentValue, {
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, KVACurrentValue: any): Observable<any> {
    return this.http
      .put(this.jsonUrlIteration + id, KVACurrentValue, {
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
