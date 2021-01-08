import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_SERVICE } from '../config/config';
import { AuthService } from './authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class KVAAbilityToInnovateService {
  jsonUrlIteration = URL_SERVICE + 'KVAAbilityToInnovate/';
  token: string;
  httpOptions: any;
  constructor(private http: HttpClient, private user: AuthService) {
    this.token = user.token;

    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
  }
  save(KVAAbilityToInnovate: any): Observable<any> {
    return this.http
      .post(this.jsonUrlIteration + 'save', KVAAbilityToInnovate, {
        headers: this.httpOptions,
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, KVAAbilityToInnovate: any): Observable<any> {
    return this.http
      .put(this.jsonUrlIteration + id, KVAAbilityToInnovate, {
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
