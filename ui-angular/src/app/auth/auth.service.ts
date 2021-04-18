import { LOCAL_KEYS } from 'src/app/shared/constants/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  getJWT() {
    localStorage.getItem(LOCAL_KEYS.JWT);
  }

  setJWT(JWT) {
    localStorage.setItem(LOCAL_KEYS.JWT, JWT);
  }

  getLocalUser(user: string) {
    localStorage.getItem(LOCAL_KEYS.USER);
  }

  setLocalUser(user: string) {
    localStorage.setItem(LOCAL_KEYS.USER, user);
  }

  clearLocalCredentials() {
    localStorage.removeItem(LOCAL_KEYS.USER);
    localStorage.removeItem(LOCAL_KEYS.JWT);
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
