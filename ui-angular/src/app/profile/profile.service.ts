import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  checkUsername(username: string) {
    return this.httpClient.get(
      `${environment.baseURL}/user/check-username/${username}`
    );
  }

  fetchProfile(username: string) {
    return this.httpClient.get(`${environment.baseURL}/profile/${username}`);
  }
}
