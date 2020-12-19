import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class KVAAbilityToInnovateService {

  jsonUrlIteration = URL_SERVICE + 'KVAAbilityToInnovate/';
  constructor(private http: HttpClient) { }
  save(KVAAbilityToInnovate: any): Observable<any> {
    return this.http
      .post(this.jsonUrlIteration + 'save', KVAAbilityToInnovate, {
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, KVAAbilityToInnovate: any): Observable<any> {
    return this.http
      .put(this.jsonUrlIteration + id, KVAAbilityToInnovate, {
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
