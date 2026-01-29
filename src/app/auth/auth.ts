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
    return this.http.post(`${this.BASE_URL}/api/auth/login`, payload) ;
    
    // , {
    //  withCredentials: true, responseType: 'text' | not required as Interceptor will handle it globally
    // });
  }

// withCredentials: true, responseType: 'text' | only if you're sure that API's response not coming in JSON form, bcz default
// http treat respone as JSON .

  logout(): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/auth/logout`, {});

    // , {
     // withCredentials: true | not required as Interceptor will handle it globally
    // });
  }

  checkSession() {
    return this.http.get(`${this.BASE_URL}/api/auth/session`);

    // , {
    //  withCredentials: true | not required as Interceptor will handle it globally
    // });
  }

}

