import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Area } from '../Interfaces/Area';
export interface areaData {
  data: Area[];
}
@Injectable({
  providedIn: 'root',
})
export class AreaServiceService {
  constructor(private http: HttpClient) {}

  readonly baseUrl = 'https://localhost:44359/api/area';

  getAreas() {
    return this.http.get(this.baseUrl).pipe(
      map((res) => res as any),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    const errMsg = error.Message
      ? error.Message
      : error.Status
      ? `${error.Status} - ${error.StatusText}`
      : `Server Error`;
    console.log(errMsg);
    return throwError(errMsg);
  }
}
