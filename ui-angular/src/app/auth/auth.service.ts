import { LOCAL_KEYS } from 'src/app/shared/constants/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  setLocalUser(user: string) {
    localStorage.setItem(LOCAL_KEYS.USER, user);
  }

  clearLocalUser() {
    localStorage.removeItem(LOCAL_KEYS.USER);
  }

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
