import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../../model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.get<Auth>(`${environment.BASE_API}/signin`);
  }

  saveAuth(auth: Auth) {
    if (auth.accessToken) {
      localStorage.setItem('token', auth.accessToken);
    }
  }

  cleanAuth() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
