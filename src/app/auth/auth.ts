import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class authService {

  private readonly BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(payload: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/auth/login`, payload, {
      withCredentials: true, responseType: 'text'
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/auth/logout`, {}, {
      withCredentials: true
    });
  }

}
