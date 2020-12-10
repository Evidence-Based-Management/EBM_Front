import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Iteration } from '../Interfaces/iterations';
import { URL_SERVICE } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class IterationsService {
  jsonUrlIteration = URL_SERVICE + 'iterations/iteration/';
  jsonUrlTeam = URL_SERVICE + 'teams/team/';

  constructor(private http: HttpClient) {}

  getIterationsByTeam(idTeam: number): Observable<any> {
    return this.http
      .get(this.jsonUrlTeam + idTeam, { responseType: 'json' })
      .pipe(catchError(this.errorHandler));
  }
  getIterationById(id: string): Observable<any> {
    return this.http.get(this.jsonUrlIteration + id, { responseType: 'json' }).pipe(
      // map((iterations: any) => {
      //   return iterations.iterations.filter((iteration) => iteration.id === id);
      // }),
      catchError(this.errorHandler)
    );
  }

  updateIteration(iteration: Iteration): Observable<any> {
    return this.http
      .put(this.jsonUrlIteration, iteration, { responseType: 'json' })
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
