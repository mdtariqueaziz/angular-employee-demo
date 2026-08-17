import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiBaseUrl+'employee';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {

    return this.http.get<any>(this.baseUrl);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);

  }

  updateUser(user: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

}
