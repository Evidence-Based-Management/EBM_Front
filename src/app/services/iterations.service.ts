import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IterationsService {
  jsonUrl = 'assets/data/iterations.json';

  constructor(private http: HttpClient) {}

  getIterations(): Observable<any> {
    return this.http
      .get(this.jsonUrl, { responseType: 'json' })
      .pipe(catchError(this.errorHandler));
  }
  getIterationById(id): Observable<any> {
    return this.http.get(this.jsonUrl, { responseType: 'json' }).pipe(
      map((iterations: any) => {
        return iterations.iterations.filter((iteration) => iteration.id === id);
      }),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      console.log('soy instancia de ErrorEvent');
      
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
  }
}
