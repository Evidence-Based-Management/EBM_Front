import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IterationsService {
  jsonUrl = 'assets/data/iterations.json';

  constructor(private http: HttpClient) {}
  getJsonIterations(): Observable<any> {
    return this.http.get(this.jsonUrl, { responseType: 'json' });
  }
}
