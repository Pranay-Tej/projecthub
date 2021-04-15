import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  // utils
  getUrl = () => `${environment.baseURL}/user`;

  login(loginCredentials) {
    return this.httpClient.post(`${this.getUrl()}/login`, loginCredentials);
  }

  logout() {
    return this.httpClient.post(`${this.getUrl()}/logout`, {});
  }

  getUser() {
    return this.httpClient.get(`${this.getUrl()}`);
  }
}
