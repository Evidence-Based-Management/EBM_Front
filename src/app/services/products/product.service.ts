import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_SERVICE } from '../../config/config';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  jsonUrlProduct = URL_SERVICE + 'product/';
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
  getIterationsByPoduct(idProduct: number): Observable<any> {
    this.setUserAuthentication();
    return this.http
      .get(this.jsonUrlProduct + idProduct, {
        headers: this.httpOptions,
        responseType: 'json',
      })
      .pipe(catchError(this.errorHandler));
  }

  getProductByUser(): Observable<any> {
    this.setUserAuthentication();
    return this.http
      .get(this.jsonUrlProduct + 'byuser/' + this.auth.id, {
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
