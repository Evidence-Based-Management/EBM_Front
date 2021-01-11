import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_SERVICE } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class IterationsService {
  jsonUrlIteration = URL_SERVICE + 'iterations/';

  token: string;
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');

    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
  }

  getIterationById(id: string): Observable<any> {
    return this.http
      .get(this.jsonUrlIteration + 'iteration/' + id, {
        headers: this.httpOptions,
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  getLastIterationByTeam(idTeam: number): Observable<any> {
    return this.http
      .get(this.jsonUrlIteration + 'last/' + idTeam, {
        headers: this.httpOptions,
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  save(iteration: any): Observable<any> {
    return this.http
      .post(this.jsonUrlIteration + 'save', iteration, {
        headers: this.httpOptions,
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, iteration: any): Observable<any> {
    return this.http
      .put(this.jsonUrlIteration + 'iteration/' + id, iteration, {
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
