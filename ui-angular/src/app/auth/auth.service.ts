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

  setLocalUser(username: string, userId: string) {
    localStorage.setItem(LOCAL_KEYS.USERNAME, username);
    localStorage.setItem(LOCAL_KEYS.USER_ID, userId);
  }

  clearLocalCredentials() {
    localStorage.removeItem(LOCAL_KEYS.USERNAME);
    localStorage.removeItem(LOCAL_KEYS.USER_ID);
    localStorage.removeItem(LOCAL_KEYS.JWT);
  }

  // utils
  getUrl = () => `${environment.baseURL}/user`;

  checkUsername(username: string) {
    return this.httpClient.get(`${this.getUrl()}/check-username/${username}`);
  }

  checkEmail(email: string) {
    return this.httpClient.get(`${this.getUrl()}/check-email/${email}`);
  }

  register(credentials) {
    return this.httpClient.post(`${this.getUrl()}/register`, credentials);
  }

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
