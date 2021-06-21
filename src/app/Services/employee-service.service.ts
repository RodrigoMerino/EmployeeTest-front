import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Employee } from '../Interfaces/Employee';
export interface employeeData {
  data: Employee[];
  meta: {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
}
@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  constructor(private http: HttpClient) {}
  private updateEmployee = new BehaviorSubject<Employee>({} as any);

  readonly baseUrl = 'https://localhost:44359/api/employee';
  readonly baseUrluri = 'https://localhost:44359/api/employee?id=';
  update(employee) {
    this.updateEmployee.next(employee);
  }

  getEmployee(): Observable<Employee> {
    return this.updateEmployee.asObservable();
  }
  getEmployees() {
    return this.http.get(this.baseUrl).pipe(
      map((res) => res as any),
      catchError(this.handleError)
    );
  }

  getAllPaginated(
    currentPage: number,
    totalperPage: number
  ): Observable<employeeData> {
    let params = new HttpParams();
    params = params.append('PageNumber', String(currentPage));
    params = params.append('PageSize', String(totalperPage));

    return this.http.get<employeeData[]>(this.baseUrl, { params }).pipe(
      map((res) => res as any),
      catchError(this.handleError)
    );
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.baseUrl, employee);
  }

  updatedEmployee(id: number, employee: Employee) {
    return this.http.put(this.baseUrluri + id, employee);
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
