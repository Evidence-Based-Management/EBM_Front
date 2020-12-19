import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../config/config';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KVATimeToMarketService {

  jsonUrlIteration = URL_SERVICE + 'KVATimeToMarket/';

  constructor(private http: HttpClient) { }
  save(KVATimeToMarket: any): Observable<any> {
    return this.http
      .post(this.jsonUrlIteration + 'save', KVATimeToMarket, {
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, KVATimeToMarket: any): Observable<any> {
    return this.http
      .put(this.jsonUrlIteration + id, KVATimeToMarket, {
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
