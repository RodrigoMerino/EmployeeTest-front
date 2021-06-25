import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Subarea } from '../Interfaces/Subarea';
export interface SubareaData {}
@Injectable({
  providedIn: 'root',
})
export class SubareaServiceService {
  constructor(private http: HttpClient) {}

  readonly baseUrl = 'https://localhost:44359/api/subarea/';
  readonly baseUrlPython = 'http://127.0.0.1:3000/get_subarea/';

  getSubareas(idArea: number): Observable<Subarea[]> {
    return this.http.get(this.baseUrl + idArea).pipe(
      map((res) => res as any),
      catchError(this.handleError)
    );
  }

  getSubareasPython(idArea: number): Observable<Subarea[]> {
    return this.http.get(this.baseUrlPython + idArea).pipe(
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
