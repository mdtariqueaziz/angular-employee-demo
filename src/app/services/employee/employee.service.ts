import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Employee, EmployeePage } from 'src/app/core/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.apiBaseUrl + 'employee';

  constructor(private http: HttpClient) { }

  /** GET all employees */
  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  /** GET paginated employees */
  getEmployeePage(queryData: string, order: string, page: number, limit: number): Observable<EmployeePage> {
    const params = new HttpParams()
      .set('queryData', queryData)
      .set('order', order)
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<EmployeePage>(this.baseUrl + '/pages', { params });
  }

  /** GET single employee by id */
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  /** POST create new employee */
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  /** PUT update existing employee */
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
  }

  /** DELETE employee */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
